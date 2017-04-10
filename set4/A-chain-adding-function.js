function add(n) {
    var sum = n;

    function f(x) {
        sum += x;
        return f;
    }

    f.valueOf = function () {
        return sum;
    };
    return f
}