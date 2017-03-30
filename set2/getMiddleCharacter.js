//-	http://www.codewars.com/kata/get-the-middle-character

function getMiddle(s) {
    var result;
    if(s.length == 1){
        result = s;
    } else if(s.length%2 == 0) {
        var middle_index1 = Math.floor(s.length/2 -1);
        var middle_index2 = Math.ceil(s.length/2);
        result = s[middle_index1] + s [middle_index2];
    } else {
        var middle_index = Math.floor(s.length/2);
        result = s[middle_index];
    }
    return result;
}