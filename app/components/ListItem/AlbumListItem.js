import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'translations/common-messages';
import { SongsMessage } from 'components/Message';
import { Link } from 'react-router-dom';
import './AlbumListItem.scss';

function AlbumListItem({ album }) {
  return (
    <div className="song-album-item">
      <img src={album.thumbnail && album.thumbnail.path} alt={album.title} />
      <div>
        <Link to={`/album/${album.slug}`}>{album.title}</Link>
        <br />
        <span>
          <FormattedMessage {...commonMessages.album} />{' '}
          {album.year && ` • ${album.year}`} {' • '} {album.songs || 0}{' '}
          <SongsMessage count={album.songs || 0} />
        </span>
      </div>
    </div>
  );
}

AlbumListItem.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default AlbumListItem;
