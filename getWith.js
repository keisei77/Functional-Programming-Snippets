function getWith (attr) {
  return function (object) {
    return object[attr]
  }
}

var inventory = {
  apples: 0,
  oranges: 144,
  eggs: 36
}

getWith('oranges')(inventory)

const getWith = (attr) => (object) => object[attr]
