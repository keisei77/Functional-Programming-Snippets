const mapWith = (fn, [first, ...rest]) =>
  first === undefined
    ? []
    : [fn(first), ...mapWith(fn, rest)]

mapWith((x) => x * x, [1, 2, 3, 4, 5])
mapWith((x) => !!x, [null, true, 25, false, 'foo'])

// After optimized
const mapWith = (fn, [first, ...rest], prepend = []) =>
  first === undefined
    ? prepend
    : mapWith(fn, rest, [...prepend, fn(first)])

// Deep map with
const report = 
[ [ { price: 1.99, id: 1 },
  { price: 4.99, id: 2 },
  { price: 7.99, id: 3 },
  { price: 1.99, id: 4 },
  { price: 2.99, id: 5 },
  { price: 6.99, id: 6 } ],
[ { price: 5.99, id: 21 },
  { price: 1.99, id: 22 },
  { price: 1.99, id: 23 },
  { price: 1.99, id: 24 },
  { price: 5.99, id: 25 } ],

// ...

[ { price: 7.99, id: 221 },
  { price: 4.99, id: 222 },
  { price: 7.99, id: 223 },
  { price: 10.99, id: 224 },
  { price: 9.99, id: 225 },
  { price: 9.99, id: 226 } ] ]

const deepMapWith = (fn) => {
  function innerDeepMapWith (tree) {
    return Array.prototype.map.call(tree, (element) =>
      Array.isArray(element)
        ? innerDeepMapWith(element)
        : fn(element)
    )
  }
}

const getWith = (attr) => (object) => object[attr]

deepMapWith(getWith('price'))(report)
