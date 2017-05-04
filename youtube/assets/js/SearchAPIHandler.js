var SearchApiHandler = function () {};

SearchApiHandler.prototype.getSearchResults = function(url, queryParams, callback) {
    url = url + '?' + this.constructUrLFromParams(queryParams)
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            callback(xhr.responseText);
        }

        if (xhr.status !== 200) {
            console.log("Error");
            return;
        }
    }

    xhr.open("GET", url, true)
    xhr.send();
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

