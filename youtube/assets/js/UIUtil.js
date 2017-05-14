var UIUtil = function (searchApi, pagenator) {
    this.searchApi = searchApi;
    this.pagenator = pagenator;
};

UIUtil.prototype.renderSearchDivision = function () {
    var searchDivision, searchBox, self = this;

    searchDiv = document.createElement('div');
    searchDiv.classList.add('search');

    searchBox = document.createElement('input');
    searchBox.setAttribute('type', 'text');
    searchBox.setAttribute('id', 'youtubesearch');

    searchBox.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            self.searchForVideos(searchBox.value);
        }
    });

    searchDiv.appendChild(searchBox);
    document.body.appendChild(searchDiv);
}

UIUtil.prototype.searchForVideos = function (searchText) {
    var url = AppConstants.YOUTUBE_API_SEARCH_URL,
        self = this;
    var queryParams = {
        key: AppConstants.API_KEY,
        part: AppConstants.PART,
        type: AppConstants.TYPE,
        maxResults: AppConstants.MAX_RESULTS,
        q: searchText
    }
    this.searchApi.getSearchResults(url, queryParams).then(function (apiResponse) {
        self.renderSearchResults(apiResponse);
    });

}

UIUtil.prototype.renderSearchResults = function (videos) {
    var self = this;
    this.renderVideos(videos);
    self.renderPagenationFor(videos);
    window.addEventListener("resize", function () {
        self.renderPagenationFor(videos)
    });
}

UIUtil.prototype.renderPagenationFor = function (items) {
    var numberOfpagesToDisplay = this.pagenator.getTotalNumberOfPagesFor(items);
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
    var paginationControlsElement = document.querySelector('#pagination').firstElementChild;
    var self = this;
    paginationControlsElement.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            self.pagenator.setCurrentPage(event.target.text);
            self.renderVideos(self.searchApi.getTotalVideos());
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
    var paginationElement = document.querySelector('#pagination').firstElementChild;
    var currentPage = this.pagenator.getCurrentPage();
    var aTag = paginationElement.querySelector('#page' + currentPage);

    if (!aTag) {
        currentPage = 1;
        this.pagenator.setCurrentPage(currentPage);
        aTag = paginationElement.querySelector('#page' + currentPage);
    }

    var previousActivePage = paginationElement.querySelector('.active');
    if (previousActivePage) {
        previousActivePage.classList.remove('active');
    }

    aTag.classList.add('active');
}

UIUtil.prototype.renderVideos = function (videos) {
    var allVideosElelement = document.createElement('div');
    var allVideosFragment = document.createDocumentFragment();
    var numberOfCards = this.pagenator.getNumberOfVideosForCurrentPage();
    var startIndex = this.pagenator.getStartIndexForPage(numberOfCards);

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

    var numberOfpages = this.pagenator.getTotalNumberOfPagesFor(videos);
    this.renderPageNumbers(numberOfpages);
    this.addEventListenerForPageClick();
}


UIUtil.prototype.constructHTMLNodeFor = function (card, index) {
    var videoContainerTemplate = document.querySelector('#videoContainertpl');
    var clone = document.importNode(videoContainerTemplate.content, true);
    clone.querySelector('.videoContainer').setAttribute('id', 'video_' + index);

    var imgElement = clone.querySelector('img');
    imgElement.setAttribute('src', card.snippet.thumbnails.medium.url);

    var title = clone.querySelector('.title');
    var aTag = document.createElement('a');
    aTag.setAttribute('href', AppConstants.YOUTUBE_WATCH_LINK + card.id.videoId);
    aTag.setAttribute('target', '_blank');
    aTag.appendChild(document.createTextNode(card.snippet.title));
    title.appendChild(aTag);

    var channelTitle = clone.querySelector('.channelTitle');
    channelTitle.appendChild(document.createTextNode(card.snippet.channelTitle));

    var publishedDate = clone.querySelector('.publishedDate');
    publishedDate.appendChild(document.createTextNode(card.snippet.publishedAt));

    var description = clone.querySelector('.description');
    description.appendChild(document.createTextNode(card.snippet.description));

    return clone;
}