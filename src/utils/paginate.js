import _ from 'lodash';

export function paginate(movieList, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(movieList).slice(startIndex).take(pageSize).value();
}
