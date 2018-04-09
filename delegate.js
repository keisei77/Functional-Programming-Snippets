const methodNames = (object) =>
  Object.keys(object).filter(key => typeof(object[key]) === 'function')

function delegate (receiver, metaobject, ...methods = methodNames(metaobject)) {
  methods.forEach(function (methodName) {
    receiver[methodName] = (...args) => metaobject[methodName].apply(receiver, args)
  })

  return receiver
}
