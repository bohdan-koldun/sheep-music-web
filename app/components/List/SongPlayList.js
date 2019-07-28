import React from 'react';
import PropTypes from 'prop-types';
import { SongListItem } from 'components/ListItem';
import './SongPlayList.scss';

function SongPlayList({ songs, playData, play, playPauseSong }) {
  return songs ? (
    <div className="song-list">
      {songs.map(song => (
        <SongListItem
          key={song.slug}
          song={song}
          playPauseSong={playPauseSong}
          playData={playData}
          play={play}
        />
      ))}
    </div>
  ) : null;
}

SongPlayList.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
  play: PropTypes.bool,
  playData: PropTypes.shape({
    song: PropTypes.shape({
      title: PropTypes.string,
      audioMp3: PropTypes.shape({
        path: PropTypes.string,
      }),
    }),
    prevPlayListId: PropTypes.number,
    nextPlayListId: PropTypes.number,
  }),
  playPauseSong: PropTypes.func,
};

export default SongPlayList;
