import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { SongPlayer } from 'components/Player';
import {
  makeSelectPlay,
  makeSelectShowPlayer,
  makeSelectAudioPlayerSong,
  makeSelectAudioPlayerList,
} from './selectors';
import reducer from './reducer';
import { setPlayPause } from './actions';
import './AudioPlayer.scss';

export function AudioPlayer({ play, onPlayPause, showPlayer, song }) {
  useInjectReducer({ key: 'audioPlayer', reducer });
  // useInjectSaga({ key: 'audioPlayer', saga });

  return (
    <Fragment>
      {showPlayer && song && song.audioMp3 && song.audioMp3.path && (
        <div className="sheep-music-player">
          <SongPlayer
            playing={play}
            playPause={() => onPlayPause(song.id)}
            song={song}
          />
        </div>
      )}
    </Fragment>
  );
}

AudioPlayer.propTypes = {
  play: PropTypes.bool,
  showPlayer: PropTypes.bool,
  song: PropTypes.shape({
    title: PropTypes.string,
    audioMp3: PropTypes.shape({
      path: PropTypes.string,
    }),
  }),
  onPlayPause: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  play: makeSelectPlay(),
  showPlayer: makeSelectShowPlayer(),
  song: makeSelectAudioPlayerSong(),
  playList: makeSelectAudioPlayerList(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPlayPause: id => dispatch(setPlayPause(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AudioPlayer);
