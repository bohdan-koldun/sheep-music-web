import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'translations/common-messages';

function SongsMessage({ count }) {
  if (
    count % 10 >= 2 &&
    count % 10 < 5 &&
    (count < 5 || count > 20) &&
    count < 100
  ) {
    return <FormattedMessage {...commonMessages.manySongFirstVariant} />;
  }
  if (count > 20 && count % 10 === 1) {
    return <FormattedMessage {...commonMessages.manySongThirdVariant} />;
  }
  if (count >= 5 || count === 0) {
    return <FormattedMessage {...commonMessages.manySongSecondVariant} />;
  }

  return <FormattedMessage {...commonMessages.oneSong} />;
}

SongsMessage.propTypes = {
  count: PropTypes.number,
};

export default SongsMessage;
