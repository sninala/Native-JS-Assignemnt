function compose() {
  var funcs = arguments;
    return function(input){
      for(var i=funcs.length-1; i>=0; i--){
          input = funcs[i](input)
      }
      return input;
    }
}