import React from 'react';
import PropTypes from 'prop-types';
import { SongPlayerItem } from 'components/ListItem';
import './PlayerPlayList.scss';

function PlayerPlayList({ songs, playData, play, playPauseSong }) {
  return songs ? (
    <div className="player-song-list">
      {songs.map((song, index) => (
        <SongPlayerItem
          key={song.slug}
          song={song}
          playPauseSong={playPauseSong}
          playData={playData}
          play={play}
          listId={index}
        />
      ))}
    </div>
  ) : null;
}

PlayerPlayList.propTypes = {
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

export default PlayerPlayList;
