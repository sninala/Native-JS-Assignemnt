// http://www.codewars.com/kata/partition-on

function partitionOn(pred, items) {
    var false_idx = 0
    for (var i = 0; i < items.length; i++) {
        var currentItem = items[i];
        if (!pred(currentItem)) {
            items.splice(i, 1); //remove current item for index i
            items.splice(false_idx, 0, currentItem); //add current item at false index
            false_idx += 1;
        }
    }
    return false_idx
}