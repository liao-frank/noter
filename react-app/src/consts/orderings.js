export const NAME = 'Name';
export const DATE_MODIFIED = 'Date modified';
export const DATE_CREATED = 'Date created';

const orderItems = (ordering, arr, direction='asc') => {
  let result = arr;
  arr = arr.filter(item => item);

  if (ordering === NAME) {
    result = arr.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
  }

  if (ordering === DATE_MODIFIED) {
    result = arr.sort((a, b) => {
      const aDate = new Date(a.modified);
      const bDate = new Date(b.modified);

      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;
      return 0;
    });
  }

  if (ordering === DATE_CREATED) {
    result = arr.sort((a, b) => {
      const aDate = new Date(a.created);
      const bDate = new Date(b.created);

      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;
      return 0;
    });
  }

  return direction === 'asc' ? result : result.reverse();
};

export default orderItems;
