var SearchApiHandler = (function () {
    "use strict";

    function SearchApiHandler() {};

    SearchApiHandler.prototype.getSearchResults = function (url, queryParams) {
        var self = this;
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