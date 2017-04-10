//-	http://www.codewars.com/kata/function-cache

function cache(func) {
    var result = {};
    return function () {
        var key = JSON.stringify(arguments);
        if (!result.hasOwnProperty(key)) {
            result[key] = func.apply(null, arguments);
        }
        return result[key];
    };
}