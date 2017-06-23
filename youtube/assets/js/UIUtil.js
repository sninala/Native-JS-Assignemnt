var UIUtil = (function () {
    "use strict";

    function UIUtil() {
        //x,y cordinates to detect the swipe event
        this.xDown = null;
        this.yDown = null;
    };

    UIUtil.prototype.renderSearchDivision = function () {
        var searchDivision, searchBox, searchDiv, self = this;
        searchDiv = document.createElement('div');
        searchDiv.classList.add('search');
        searchBox = document.createElement('input');
        searchBox.setAttribute('type', 'text');
        searchBox.setAttribute('id', 'youtubesearch');
        searchBox.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                var searchText = searchBox.value;
                searchApi.searchForVideos(searchText).then(function (apiResponse) {
                    self.renderSearchResults(apiResponse);
                });
            }
        });

        searchDiv.appendChild(searchBox);
        document.body.appendChild(searchDiv);
    }

    UIUtil.prototype.renderSearchResults = function (videos) {
        var self = this;
        this.renderVideos(videos);
        self.renderPagenationFor(videos);
        window.addEventListener("resize", function () {
            self.renderPagenationFor(videos)
        });
        document.addEventListener('touchstart', function (event) {
            this.xDown = event.touches[0].clientX;
            this.yDown = event.touches[0].clientY;
        });
        document.addEventListener('touchmove', function (event) {
            var xUp, yUp, xDiff, yDiff, currentPage, numberOfpages;
            if (!this.xDown || !this.yDown) {
                return;
            }

            xUp = event.touches[0].clientX;
            yUp = event.touches[0].clientY;

            xDiff = this.xDown - xUp;
            yDiff = this.yDown - yUp;
            currentPage = paginator.getCurrentPage();
            currentPage = parseInt(currentPage)
            numberOfpages = paginator.getTotalNumberOfPagesFor(videos);
            if (Math.abs(xDiff) > Math.abs(yDiff)) { 
                if (xDiff > 0) {
                    if (currentPage < numberOfpages){
                        currentPage = currentPage + 1;
                    } else{
                        currentPage = numberOfpages;
                    }
                    
                } else {
                    if (currentPage > 1){
                        currentPage = currentPage - 1;
                    } else {
                        currentPage = 1
                    }
                }
                var element = document.querySelector('#page' + currentPage);
                element.click();
            } 
            this.xDown = null;
            this.yDown = null;
        });
    }

    UIUtil.prototype.renderPagenationFor = function (items) {
        var numberOfpagesToDisplay = paginator.getTotalNumberOfPagesFor(items);
        this.renderPageNumbers(numberOfpagesToDisplay);
        this.addEventListenerForPageClick();
    }

    UIUtil.prototype.clearPreviosSearchResults = function (items) {
        var allVideos = document.querySelector('#search-results');
        if (allVideos) {
            allVideos.parentElement.removeChild(allVideos);
        }
    }

    UIUtil.prototype.renderPageNumbers = function (numberOfpages) {
        this.clearPagination();
        var paginationElement = document.createElement('div');
        paginationElement.setAttribute('id', 'pagination');

        var paginationControlsElement = document.createElement('div');
        paginationControlsElement.classList.add('pagination-controls')

        var paginationFragment = document.createDocumentFragment();
        for (var i = 0; i < numberOfpages; i++) {
            var aTag = document.createElement('a');
            aTag.appendChild(document.createTextNode(i + 1));
            aTag.setAttribute('id', 'page' + (i + 1));
            aTag.setAttribute('href', '#');
            paginationFragment.appendChild(aTag);
        }
        paginationControlsElement.appendChild(paginationFragment);
        paginationElement.appendChild(paginationControlsElement);
        document.body.appendChild(paginationElement);
        this.highliteCurrentPage();
    }


    UIUtil.prototype.addEventListenerForPageClick = function () {
        var paginationControlsElement = document.querySelector('#pagination').firstElementChild,
            self = this;
        paginationControlsElement.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') {
                paginator.setCurrentPage(event.target.text);
                self.renderVideos(searchApi.getTotalVideos());
                self.highliteCurrentPage();
            }
        });
    }

    UIUtil.prototype.clearPagination = function () {
        var paginationElement = document.querySelector('#pagination');
        if (paginationElement) {
            paginationElement.parentElement.removeChild(paginationElement);
        }
    }

    UIUtil.prototype.highliteCurrentPage = function () {
        var paginationElement, currentPage, aTag, previousActivePage;
        paginationElement = document.querySelector('#pagination').firstElementChild;
        currentPage = paginator.getCurrentPage();
        aTag = paginationElement.querySelector('#page' + currentPage);

        if (!aTag) {
            currentPage = 1;
            paginator.setCurrentPage(currentPage);
            aTag = paginationElement.querySelector('#page' + currentPage);
        }
        previousActivePage = paginationElement.querySelector('.active');
        if (previousActivePage) {
            previousActivePage.classList.remove('active');
        }
        aTag.classList.add('active');
    }

    UIUtil.prototype.renderVideos = function (videos) {
        var allVideosFragment, allVideosElelement, numberOfCards, startIndex, numberOfpages;
        allVideosElelement = document.createElement('div');
        allVideosFragment = document.createDocumentFragment();
        numberOfCards = paginator.getNumberOfVideosForCurrentPage();
        startIndex = paginator.getStartIndexForPage(numberOfCards);
        this.clearPreviosSearchResults();
        allVideosElelement.setAttribute('id', 'search-results');
        allVideosElelement.classList.add('search-results');
        for (var i = startIndex; i < (startIndex + numberOfCards); i++) {
            if (videos[i]) {
                var node = this.constructHTMLNodeFor(videos[i], i);
                allVideosFragment.appendChild(node);
            }
        }
        allVideosElelement.appendChild(allVideosFragment);
        document.body.appendChild(allVideosElelement);
        numberOfpages = paginator.getTotalNumberOfPagesFor(videos);
        this.renderPageNumbers(numberOfpages);
        this.addEventListenerForPageClick();
    }

    UIUtil.prototype.constructHTMLNodeFor = function (card, index) {
        var videoContainerTemplate = document.querySelector('#video-container-tpl');
        var clone = document.importNode(videoContainerTemplate.content, true);
        clone.querySelector('.video-container').setAttribute('id', 'video_' + index);

        var imgElement = clone.querySelector('img');
        imgElement.setAttribute('src', card.snippet.thumbnails.medium.url);

        var title = clone.querySelector('.title');
        var aTag = document.createElement('a');
        aTag.setAttribute('href', AppConstants.YOUTUBE_WATCH_LINK + card.id.videoId);
        aTag.setAttribute('target', '_blank');
        aTag.appendChild(document.createTextNode(card.snippet.title));
        title.appendChild(aTag);

        var channelTitle = clone.querySelector('.channel-title');
        channelTitle.appendChild(document.createTextNode(card.snippet.channelTitle));

        var publishedDate = clone.querySelector('.published-date');
        publishedDate.appendChild(document.createTextNode(card.snippet.publishedAt));

        var description = clone.querySelector('.description');
        description.appendChild(document.createTextNode(card.snippet.description));

        return clone;
    }
    return UIUtil;
})();