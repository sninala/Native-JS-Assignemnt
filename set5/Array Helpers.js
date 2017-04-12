// http://www.codewars.com/kata/array-helpers
Array.prototype.square = function () {
    return this.map(function (element) {
        return Math.pow(element, 2);
    });
}

Array.prototype.cube = function () {
    return this.map(function (element) {
        return Math.pow(element, 3);
    });
}

Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b, 0);
}

Array.prototype.average = function () {
    return this.sum() / this.length;
}

Array.prototype.even = function () {
    return this.filter(function (number) {
        return (number % 2 == 0);
    });
}

Array.prototype.odd = function () {
    return this.filter(function (number) {
        return (number % 2 != 0);
    });
}