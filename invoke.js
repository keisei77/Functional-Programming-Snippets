// Send is useful when invoking a function that’s a member of an object (or of an instance’s prototype)

const send = (methodName, ...args) =>
             (instance) => instance[methodName].apply(instance, args)

const invoke = (fn, ...args) =>
               instance => fn.apply(instance, args)

const invokeEval = instance =>
                   (fn, ...args) => fn.apply(instance, args)
