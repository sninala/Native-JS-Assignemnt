/*
http://www.codewars.com/kata/transportation-on-vacation
*/

function rentalCarCost(d) {
    var amount,
        rentPerDay = 40;
    if(d < 3){
        amount = rentPerDay * d;
    } else if(d >= 3 && d < 7){
        amount = (rentPerDay * d) - 20;
    } else {
        amount = (rentPerDay * d) - 50;
    }
    return amount;
}