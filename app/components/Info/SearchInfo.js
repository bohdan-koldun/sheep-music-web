import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import messages from './messages';
import './SearchInfo.scss';

function SearchInfo({ count, page, search }) {
  return (
    <div className="search-info">
      <span>
        <FormattedMessage {...messages.results} />
      </span>
      <span className="count">{count},</span>
      {search && <span>«{search}»,</span>}
      <span>
        {page} <FormattedMessage {...messages.page} />
      </span>
    </div>
  );
}

SearchInfo.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  search: PropTypes.string,
};

export default SearchInfo;
