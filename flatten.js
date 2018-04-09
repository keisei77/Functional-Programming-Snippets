const flatten = ([first, ...rest]) => {
  if (first === undefined) {
    return []
  }
  if (!Array.isArray(first)) {
    return [first, ...flatten(rest)]
  }

  return [...flatten(first), ...flatten(rest)]
}

flatten(['foo', [3, 4, []]])
// => ["foo", 3, 4]
flatten([['foo'], [3, 4, []]])
// => ["foo", 3, 4]
