var UIUtil = function(searchApi){
    this.searchApi = searchApi;
};

UIUtil.prototype.renderSearchDivision = function () {
    var searchDivision, searchBox,self=this;
    
    searchDiv = document.createElement('div');
    searchDiv.classList.add('search');

    searchBox = document.createElement('input');
    searchBox.setAttribute('type', 'text');
    searchBox.setAttribute('id', 'youtubesearch');
	
    searchBox.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        self.searchForVideos(searchBox.value);
    }
	});


    searchDiv.appendChild(searchBox);

    document.body.appendChild(searchDiv);
}

UIUtil.prototype.searchForVideos = function (searchText) {
    var url = AppConstants.YOUTUBE_API_SEARCH_URL;
    var queryParams = {
        key: AppConstants.API_KEY,
        part: AppConstants.PART,
        type: AppConstants.TYPE,
        q: searchText
    }
    this.searchApi.getSearchResults(url, queryParams, function(response){
        console.log(response);                       
    })
    
}