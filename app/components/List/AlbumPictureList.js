import React from 'react';
import PropTypes from 'prop-types';
import { AlbumListItem } from 'components/ListItem';
import './AlbumPictureList.scss';

function AlbumPictureList({ albums }) {
  return albums ? (
    <div className="album-list">
      {albums.map(album => (
        <AlbumListItem key={album.slug} album={album} />
      ))}
    </div>
  ) : null;
}

AlbumPictureList.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
};

export default AlbumPictureList;
