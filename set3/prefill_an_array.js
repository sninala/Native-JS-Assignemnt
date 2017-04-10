// -	http://www.codewars.com/kata/prefill-an-array

function prefill(n, v) {
    var n1 = Number(n);
    if (n >= 0) {
        var elements = [];
        for (var i = 0; i < n; i++) {
            elements.push(v);
        }
        return elements;
    } else {
        throw new TypeError(n + ' is invalid')
    }
}