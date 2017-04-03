/*
http://www.codewars.com/kata/transportation-on-vacation
*/
function rentalCarCost(d) {
    var rentPerDay = 40,
        totalAmount = rentPerDay * d;
    if (d >= 7) {
        totalAmount -= 50;
    } else if (d >= 3 && d < 7) {
        totalAmount -= 20;
    }
    return totalAmount;
}