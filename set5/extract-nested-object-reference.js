// 	http://www.codewars.com/kata/extract-nested-object-reference
Object.prototype.hash = function (string) {
    var objectProperties = string.split('.'),
        result = this;
    for (var i = 0; i < objectProperties.length; i++) {
        if (result[objectProperties[i]]) {
            result = result[objectProperties[i]];
        } else {
            result = undefined;
            break;
        }
    }
    return result;
}