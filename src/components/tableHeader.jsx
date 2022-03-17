import React from 'react';

const handleSort = (e, { path, needSort }, sortColumnData, onSort) => {
  if (needSort) {
    e.stopPropagation();
    const sortColumn = { ...sortColumnData };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    onSort(sortColumn);
  }
};

const renderSortIcon = (column, sortColumn) => {
  if (column.path !== sortColumn.path) return null;
  if (sortColumn.order === 'asc') return <i className='fa fa-sort-down'></i>;
  return <i className='fa fa-sort-up'></i>;
};
const TableHeader = ({ columns, onSort, sortColumn }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className={column.needSort ? 'clickable' : ''}
            key={column.label || column.key}
            onClick={(e) => handleSort(e, column, sortColumn, onSort)}
          >
            {column.label}
            {column.needSort && renderSortIcon(column, sortColumn)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
