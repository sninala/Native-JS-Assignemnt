//-	http://www.codewars.com/kata/word-count

function countWords(str) {
    var words = str.match(/[a-z0-9-'`]+/gi);
    var count = (str == '' || !words) ? 0 : words.length;
    return  count;
}