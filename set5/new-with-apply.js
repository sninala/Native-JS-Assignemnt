// http://www.codewars.com/kata/new-with-apply
function construct(Class) {
    var args = Array.prototype.slice.call(arguments, 1);
    var object = Object.create(Class.prototype);
    Class.apply(object, args);
    return object;
}