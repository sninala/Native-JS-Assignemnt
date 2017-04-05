// -	http://www.codewars.com/kata/prefill-an-array

function prefill(n, v) {
    if (/\D+/g.test(n) || n < 0) {
        throw new TypeError(n + ' is invalid')
    }
    var elements = [];
    for (var i = 0; i < n; i++) {
        elements.push(v);
    }
    return elements;
}