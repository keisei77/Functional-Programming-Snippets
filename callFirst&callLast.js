var __slice = Array.prototype.slice;

function callFirst(fn, larg) {
  return function() {
    var args = __slice.call(arguments, 0);

    return fn.apply(this, [larg].concat(args))
  }
}

function callLast(fn, rarg) {
  return function() {
    var args = __slice.call(arguments, 0);
    console.log(this)
    return fn.apply(null, args.concat([rarg]))
  }
}

function greet(me, you) {
  return "Hello, " + you + ", my name is " + me
}

var heliosSaysHello = callFirst(greet, 'Helios');

heliosSaysHello('Eartha')
//=> 'Hello, Eartha, my name is Helios'

var sayHelloToCeline = callLast(greet, 'Celine');

sayHelloToCeline('Eartha')
//=> 'Hello, Celine, my name is Eartha'
