//-	http://www.codewars.com/kata/calculating-with-functions

function tokenize(num, func) {
  if (!func) {
		return num;
	} else {
		return func(num);
	}
}

function zero(func) {
	return tokenize(0, func);
}
function one(func) {
	return tokenize(1, func);
}
function two(func) {
	return tokenize(2, func);
}
function three(func) {
	return tokenize(3, func);
}
function four(func) {
	return tokenize(4, func);
}
function five(func) {
	return tokenize(5, func);
}
function six(func) {
	return tokenize(6, func);
}
function seven(func) {
	return tokenize(7, func);
}
function eight(func) {
	return tokenize(8, func);
}
function nine(func) {
	return tokenize(9, func);
}

function plus(v) {
  return function(u) { return u + v; };
}
function minus(v) { 
    return function(u) { return u - v; };
}
function times(v) {
  return function(u) { return v * u; };
}
function dividedBy(v) {
  return function(u) { return u / v; };
}