function calculate(num) {
    return function (func) {
        return func ? func(num) : num;
    }
}

var zero = calculate(0);
var one = calculate(1);
var two = calculate(2);
var three = calculate(3);
var four = calculate(4);
var five = calculate(5);
var six = calculate(6);
var seven = calculate(7);
var eight = calculate(8);
var nine = calculate(9);

function plus(v) {
    return function (u) {
        return u + v;
    };
}

function minus(v) {
    return function (u) {
        return u - v;
    };
}

function times(v) {
    return function (u) {
        return v * u;
    };
}

function dividedBy(v) {
    return function (u) {
        return u / v;
    };
}