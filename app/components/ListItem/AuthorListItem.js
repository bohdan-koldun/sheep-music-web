import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'translations/common-messages';
import { Link } from 'react-router-dom';
import { AuthorImg } from 'components/Img';
import { SongsMessage, AlbumsMessage } from 'components/Message';
import './AuthorListItem.scss';

function AuthorListItem({ author }) {
  return (
    <div className="song-author-item">
      <AuthorImg author={author} className="author-img" />
      <div>
        <Link to={`/author/${author.slug}`}>{author.title}</Link>
        <br />
        <span>
          <FormattedMessage {...commonMessages.author} />{' '}
          {author.year && ` • ${author.year}`} {' • '} {author.songs || 0}{' '}
          <SongsMessage count={author.songs || 0} />
          {' • '} {author.albums || 0}{' '}
          <AlbumsMessage count={author.albums || 0} />
        </span>
      </div>
    </div>
  );
}

AuthorListItem.propTypes = {
  author: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default AuthorListItem;
