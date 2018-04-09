var __slice = Array.prototype.slice

function curry (fn) {
  var arity = fn.length

  return given([])

  function given (argsSoFar) {
    return function helper () {
      var updatedArgsSoFar = argsSoFar.concat(__slice.call(arguments, 0))

      if (updatedArgsSoFar.length >= arity) {
        return fn.apply(this, updatedArgsSoFar)
      } else {
        return given(updatedArgsSoFar)
      }
    }
  }
}

function sumOfFour (a, b, c, d) {
  return a + b + c + d
}

var curried = curry(sumOfFour)

// curried(1)(2)(3)(4)
curried(1, 2)(3, 4)
// curried(1, 2, 3, 4)


// ES6
function curry (fn) {
  let arity = fn.length

  return given()

  function given (...args) {
    return function helper (...helpArgs) {
      let updatedArgs = [...args, ...helpArgs]
      if (updatedArgs.length >= arity) {
        return fn.apply(this, updatedArgs)
      } else {
        return given(...updatedArgs)
      }
    }
  }
}

function sumOfFour (a, b, c, d) {
  return a + b + c + d
}

var curried = curry(sumOfFour)

curried(1, 2)(3, 4)
