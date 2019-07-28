import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import './Pagination.scss';

function Pagination({ onPageChange, pageCount, forcePage }) {
  return (
    <React.Fragment>
      <ReactPaginate
        previousLabel={<MdNavigateBefore />}
        nextLabel={<MdNavigateNext />}
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount}
        forcePage={forcePage || 0}
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        onPageChange={onPageChange}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </React.Fragment>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  pageCount: PropTypes.number,
  forcePage: PropTypes.number,
};

export default Pagination;
