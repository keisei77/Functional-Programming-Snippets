// ES6 functional ('blue') style
const compose = (a, b) =>
  (x) => a(b(x))

// both functional and methods style ('green') style
const compose = (a, b) =>
  function (x) {
    return a.call(this, b.call(this, x))
  }
