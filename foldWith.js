const foldWith = (fn, terminalValue, [first, ...rest]) =>
  first === undefined
    ? terminalValue
    : fn(first, foldWith(fn, terminalValue, rest))

foldWith((number, rest) => number * number + rest, 0, [1, 2, 3, 4, 5])
