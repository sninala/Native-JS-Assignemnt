// http://www.codewars.com/kata/santaclausable-interface

function isSantaClausable(obj) {
    return (obj &&
        (typeof obj.sayHoHoHo === "function") &&
        (typeof obj.distributeGifts === "function") &&
        (typeof obj.goDownTheChimney === "function")
    );
}