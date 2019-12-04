import React from 'react';
import PropTypes from 'prop-types';
import { SongsMessage } from 'components/Message';
import { Link } from 'react-router-dom';
import './AlbumListItem.scss';

function AlbumListItem({ album }) {
  return (
    <Link to={`/album/${album.slug}`} className="song-album-item">
      <img src={album.thumbnail && album.thumbnail.path} alt={album.title} />
      <div className="album-item-name">
        <h4>{album.title}</h4>
      </div>
      <div className="album-item-info">
        <span>
          {album.year && `${album.year} • `} {album.songs || 0}{' '}
          <SongsMessage count={album.songs || 0} />
          {album.author && ` • ${album.author.title}`}
        </span>
      </div>
    </Link>
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
