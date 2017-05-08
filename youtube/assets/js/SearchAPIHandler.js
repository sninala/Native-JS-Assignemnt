var SearchApiHandler = function () {};

SearchApiHandler.prototype.getSearchResults = function (url, queryParams) {
    url = url + '?' + this.constructUrLFromParams(queryParams);
    console.log(url);
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        return responseJson['items'];
    }).catch(function (error) {
        console.log('youtube API call Error: ' + error.message);
    });
}

SearchApiHandler.prototype.constructUrLFromParams = function(queryParams) {
    var encodedString = '';
    for (var prop in queryParams) {
        if (encodedString.length > 0) {
            encodedString += '&';
        }
        encodedString += encodeURI(prop + '=' + queryParams[prop]);
    }
    return encodedString;
}

