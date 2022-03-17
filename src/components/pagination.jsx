import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, itemsCount, pageSize, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pages.map((page) => (
          <li
            className={currentPage == page ? 'page-item active' : 'page-item'}
            key={page}
          >
            <a onClick={() => onPageChange(page)} className='page-link'>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;