const sortByKey: SortByKey = (arr, key, direction = 'ascending') => {
  const guards = [!arr, arr.length === 0, !key];

  if (guards.includes(true)) {
    return arr;
  }

  const sorted = arr.sort((a, b) => {
    if (a[key] < b[key]) {
      return direction === 'ascending' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return sorted;
};

export { sortByKey };
