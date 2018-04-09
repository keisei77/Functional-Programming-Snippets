var a = [1, 2, 3],
    accrete = a.concat;

var contextualize = function (fn, context) {
  return function () {
    return fn.apply(context, arguments)
  }
}

accrete = contextualize(a.concat, a)
accrete([4, 5])

function maybe (fn) {
  return function (argument) {
    if (argument !== null) {
      return fn.call(this, argument)
    }
  }
}

// ES6
// functional ('blue') style
const maybe = (fn) =>
  (...args) => {
    for (let arg of args) {
      if (arg == null) return arg
    }
    return fn(...args)
  }

// both functional and methods style ('green')
const maybe = (fn) =>
  function (...args) {
    for (let arg of args) {
      if (arg === null || arg === undefined) return arg
    }
    return fn.apply(this, args)
  }
