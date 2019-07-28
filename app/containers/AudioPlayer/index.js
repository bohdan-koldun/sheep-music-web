/* eslint-disable prettier/prettier */
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
  makeSelectAudioPlayData,
  makeSelectAudioPlayerList,
} from './selectors';
import reducer from './reducer';
import { setPlayPause, setPlayByListId } from './actions';
import './AudioPlayer.scss';

export function AudioPlayer({
  play,
  onPlayPause,
  onPrevNext,
  showPlayer,
  playData,
}) {
  useInjectReducer({ key: 'audioPlayer', reducer });

  return (
    <Fragment>
      {showPlayer &&
        playData &&
        playData.song &&
        playData.song.audioMp3 &&
        playData.song.audioMp3.path && (
        <div className="sheep-music-player">
          <SongPlayer
            playing={play}
            playPause={onPlayPause}
            onPrevNext={onPrevNext}
            playData={playData}
          />
        </div>
      )}
    </Fragment>
  );
}

AudioPlayer.propTypes = {
  play: PropTypes.bool,
  showPlayer: PropTypes.bool,
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
  onPlayPause: PropTypes.func.isRequired,
  onPrevNext: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  play: makeSelectPlay(),
  showPlayer: makeSelectShowPlayer(),
  playData: makeSelectAudioPlayData(),
  playList: makeSelectAudioPlayerList(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPlayPause: () => dispatch(setPlayPause()),
    onPrevNext: listId => dispatch(setPlayByListId(listId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AudioPlayer);
