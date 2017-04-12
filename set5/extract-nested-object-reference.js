// 	http://www.codewars.com/kata/extract-nested-object-reference
Object.prototype.hash = function (string) {
    var objectProperties = string.split('.'),
        currentObject = this,
        result;
    for (let i = 0; i < objectProperties.length; i++) {
        let chainedProperty = objectProperties[i];
        if (currentObject[chainedProperty]) {
            currentObject = currentObject[chainedProperty];
            result = currentObject;
        } else {
            result = undefined;
            break;
        }
    }
    return result;
}