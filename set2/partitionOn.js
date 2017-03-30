// http://www.codewars.com/kata/partition-on

function partitionOn(pred, items) {
    var responseFalse = [];
    var responseTrue = [];
    items.forEach(function(item){
        var response  = pred(item);
        if(response){
            responseTrue.push(item);
        } else{
            responseFalse.push(item);
        }
    });
    alteredItems = responseFalse.concat(responseTrue);
    alteredItems.map(function(v, i ){
        return items[i] = v;
    });
    return responseFalse.length;
}