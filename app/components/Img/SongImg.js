import React from 'react';
import PropTypes from 'prop-types';
import DefaultImg from './song_thumb.png';

function SongImg({ className, song }) {
  const albumImg =
    song && song.album && song.album.thumbnail && song.album.thumbnail.path;
  const authorImg =
    song && song.author && song.author.thumbnail && song.author.thumbnail.path;

  return (
    <img
      className={className}
      src={albumImg || authorImg || DefaultImg}
      alt={song && song.title}
    />
  );
}

// We require the use of src and alt, only enforced by react in dev mode
SongImg.propTypes = {
  className: PropTypes.string,
  song: PropTypes.object,
};

export default SongImg;
