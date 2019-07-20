import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ReactPaginate from 'react-paginate';
import messages from './messages';
import './Pagination.scss';

function Pagination({ onPageChange, pageCount, forcePage }) {
  return (
    <React.Fragment>
      <ReactPaginate
        previousLabel={<FormattedMessage {...messages.previous} />}
        nextLabel={<FormattedMessage {...messages.next} />}
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount}
        forcePage={forcePage}
        marginPagesDisplayed={4}
        pageRangeDisplayed={7}
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
