// Let's make a Cat constructor!
var cats = [];

function Cat(name, weight) {
    if (!name || !weight) throw "error";

    var _weight = weight;
    cats.push(this);

    Object.defineProperty(this, "weight", {
        get: function () {
            return _weight;
        },
        set: function (value) {
            _weight = value;
        }
    });
}

Object.defineProperty(Cat, "averageWeight", {
    get: function () {
        var sum = 0;
        for (var i = 0; i < cats.length; i++) {
            sum += cats[i].weight;
        }
        return function () {
            return sum / cats.length;
        }
    }
});