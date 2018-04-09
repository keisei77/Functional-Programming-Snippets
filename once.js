function once (fn) {
  var done = false,
      testAndSet
  
  if (!!fn.name) {
    testAndSet = function () {
      this["__once__"] || (this["__once__"] = {})
      if (this["__once__"][fn.name]) return true
      this["__once__"][fn.name] = true
      return false
    }
  } else {
    testAndSet = function (fn) {
      if (done) return true
      done = true
      return false
    }
  }

  return function () {
    return testAndSet.call(this) ? void 0 : fn.apply(this, arguments)
  }
}

once(function askedOnDate () {
  return new Date()
})()

once(function askedOnDate() {
  return new Date()
})()
