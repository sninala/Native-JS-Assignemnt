// http://www.codewars.com/kata/partition-on

function partitionOn(pred, items) {
    var false_idx = 0
    for (var i = 0; i < items.length; i++) {
        if (!pred(items[i]))
            items.splice(false_idx++, 0, items.splice(i, 1)[0])
    }
    return false_idx
}