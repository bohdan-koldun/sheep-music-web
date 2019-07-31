import React from 'react';
import PropTypes from 'prop-types';
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
          Альбом {' • '} {(album.songs && album.songs.length) || 0} композиции
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
