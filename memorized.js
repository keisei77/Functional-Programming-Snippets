function memorized (fn, keymaker) {
  var lookupTable = {},
      key;
  
  keymaker || (keymaker = function (args) {
    return JSON.stringify(args)
  })

  return function () {
    var key = keymaker.call(this, arguments)
    return lookupTable[key] || (
      lookupTable[key] = fn.apply(this, arguments)
    )
  }
}

var fastFibonacci = memorized(function (n) {
  if (n < 2) {
    return n
  }
  return fastFibonacci(n - 2) + fastFibonacci(n - 1)
})

fastFibonacci(4)

// ES6
const memorized = (fn) => {
  const lookupTable = {}

  return function (...args) {
    const key = JSON.stringify(args)

    return lookupTable[key] || (lookupTable[key] = fn.apply(this, args))
  }
}

const fastFibonacci = memorized(
  (n) =>
    n < 2
      ? n
      : fastFibonacci(n - 2) + fastFibonacci(n - 1)
)

fastFibonacci(45)

// if you have another strategy for turning the arguments into a string key
const memorized = (fn, keymaker = JSON.stringify) => {
  const lookupTable = {}

  return function (...arg) {
    const key = keymaker.apply(this, args)

    return lookupTable[key] || (lookupTable[key] = fn.apply(this, args))
  }
}
