import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import messages from './messages';
import './SearchInfo.scss';

function SearchInfo({ count, page }) {
  return (
    <div className="search-info">
      <span>
        <FormattedMessage {...messages.results} />
      </span>
      <span className="count">{count}</span>
      <span>
        ({page} <FormattedMessage {...messages.page} />)
      </span>
    </div>
  );
}

SearchInfo.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
};

export default SearchInfo;
