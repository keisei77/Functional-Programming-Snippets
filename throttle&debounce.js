function throttle (callback, delay) {
  let wait = false
  return function latter (...args) {
    if (!wait) {
      callback.apply(this, args)
      wait = true
      setTimeout(function () {
        wait = false
      }, delay)
    }
  }
}

function debounce (func, wait, immediate) {
  let timeout
  return function (...args) {
    let context = this
    let later = function later () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
