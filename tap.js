const tap = (value, fn) => {
  const curried = (fn) => (
      typeof(fn) === 'function' && fn(value),
      value
    );
  
  return fn === undefined
         ? curried
         : curried(fn);
}
