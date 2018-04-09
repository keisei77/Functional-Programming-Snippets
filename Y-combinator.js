function Y (fn) {
  var f = function (f) {
    return function () {
      return fn.apply(f, arguments)
    }
  }

  return ((function (x) {
    return f(function (v) {
      return x(x)(v)
    })
  })(function (x) {
    return f(function (v) {
      return x(x)()
    })
  }))
}

var factorial = Y(function (n) {
  return (n === 0 ? 1 : n * this(n - 1))
})

factorial(5)

// ES6
const Y = (f) =>
  (x => f(v => x(x)(v)))
  (x => f(v => x(x)(v)))
