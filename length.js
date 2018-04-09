const length = ([first, ...rest]) =>
first === undefined
  ? 0
  : 1 + length(rest)

console.log(length([]))
// => 0
console.log(length(['foo']))
// => 1
console.log(length(['foo', 'bar']))
// => 2
console.log(length(['foo', 'bar', 'baz']))
// => 3

// After optimized
const length = ([first, ...rest], numberToBeAdded = 0) =>
  first === undefined
    ? numberToBeAdded
    : length(rest, 1 + numberToBeAdded)
