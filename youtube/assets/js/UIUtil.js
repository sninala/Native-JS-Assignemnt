var UIUtil = function (searchApi) {
    this.searchApi = searchApi;
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
        self.renderVideos(apiResponse);
    });

}

UIUtil.prototype.renderVideos = function (items) {
    var videoContainertpl = document.querySelector('#videoContainertpl');
    var allVideos = document.createElement('div');
    var allVideosFragment = document.createDocumentFragment();
    this.clearPreviosSearchResults();
    allVideos.setAttribute('id', 'search-results');
    allVideos.classList.add('search-results');
    items.forEach(function(item, index){
        var clone = document.importNode(videoContainertpl.content, true);
        clone.querySelector('.videoContainer').setAttribute('id', 'video_' + index);
        var imgEl = clone.querySelector('img');
        imgEl.setAttribute('src', item.snippet.thumbnails.medium.url);
        var title = clone.querySelector('.title');
        var aTag = document.createElement('a');
        aTag.setAttribute('href', AppConstants.YOUTUBE_WATCH_LINK + item.id.videoId);
        aTag.setAttribute('target', '_blank');
        aTag.appendChild(document.createTextNode(item.snippet.title));
        title.appendChild(aTag);

        var channelTitle = clone.querySelector('.channelTitle');
        channelTitle.appendChild(document.createTextNode(item.snippet.channelTitle));

        var publishedDate = clone.querySelector('.publishedDate');
        publishedDate.appendChild(document.createTextNode(item.snippet.publishedAt));

        var description = clone.querySelector('.description');
        description.appendChild(document.createTextNode(item.snippet.description));
        allVideosFragment.appendChild(clone);
    });
    allVideos.appendChild(allVideosFragment);
    document.body.appendChild(allVideos);
}

UIUtil.prototype.clearPreviosSearchResults = function (items) {
    var allVideos = document.querySelector('#search-results');
    if (allVideos) {
        allVideos.parentElement.removeChild(allVideos);
    }
}
