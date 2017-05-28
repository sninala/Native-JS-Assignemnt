var SearchApiHandler = (function () {
    "use strict";

    function SearchApiHandler() {};

    SearchApiHandler.prototype.searchForVideos = function (searchText) {
        var url = AppConstants.YOUTUBE_API_SEARCH_URL,
            self = this;
        var queryParams = {
            key: AppConstants.API_KEY,
            part: AppConstants.PART,
            type: AppConstants.TYPE,
            maxResults: AppConstants.MAX_RESULTS,
            q: searchText
        }
        url = url + '?' + this.constructUrLFromParams(queryParams);
        console.log(url);
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (responseJson) {
            self.setTotalVideos(responseJson['items']);
            return responseJson['items'];
        }).catch(function (error) {
            console.log('youtube API call Error: ' + error.message);
        });
    }

    SearchApiHandler.prototype.constructUrLFromParams = function (queryParams) {
        var encodedString = '';
        for (var prop in queryParams) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + queryParams[prop]);
        }
        return encodedString;
    }

    SearchApiHandler.prototype.setTotalVideos = function (items) {
        this.searchResults = items;
    }

    SearchApiHandler.prototype.getTotalVideos = function () {
        return this.searchResults || [];
    }
    return SearchApiHandler;
})();