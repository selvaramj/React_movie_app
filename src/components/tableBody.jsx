import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

const handleRender = (item, column) => {
  if (column.content) return column.content(item);
  if (column.label === 'Title' && column.isLink)
    return <Link to={`/movies/${item._id}`}>{_.get(item, column.path)}</Link>;
  return _.get(item, column.path);
};

const TableBody = ({ data, columns }) => {
  console.log('table body ', columns);
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={column.label || column.key}>
              {handleRender(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
