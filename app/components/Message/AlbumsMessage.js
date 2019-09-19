import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'translations/common-messages';

function AlbumsMessage({ count }) {
  if (
    count % 10 >= 2 &&
    count % 10 < 5 &&
    (count < 5 || count > 20) &&
    count < 100
  ) {
    return <FormattedMessage {...commonMessages.manyAlbumFirstVariant} />;
  }
  if (count > 20 && count % 10 === 1) {
    return <FormattedMessage {...commonMessages.manyAlbumThirdVariant} />;
  }
  if (count >= 5 || count === 0) {
    return <FormattedMessage {...commonMessages.manyAlbumSecondVariant} />;
  }

  return <FormattedMessage {...commonMessages.oneAlbum} />;
}

AlbumsMessage.propTypes = {
  count: PropTypes.number,
};

export default AlbumsMessage;
