/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { PlayerPlayList } from 'components/List';
import {
  MdClose,
} from 'react-icons/md';

import { useInjectReducer } from 'utils/injectReducer';
import { SongPlayer } from 'components/Player';
import {
  makeSelectPlay,
  makeSelectShowPlayer,
  makeSelectAudioPlayData,
  makeSelectAudioPlayerList,
  makeSelectShowPlayerList,
} from './selectors';
import reducer from './reducer';
import { setPlayPause, setPlayByListId, setShowPlayList, mixPlayList } from './actions';
import './AudioPlayer.scss';

export function AudioPlayer({
  play,
  onPlayPause,
  onPlayById,
  onShowPlayList,
  showPlayer,
  showPlayerList,
  onMixPlayList,
  playData,
  playList,
}) {
  useInjectReducer({ key: 'audioPlayer', reducer });

  return (
    <Fragment>
      {showPlayer &&
        playData &&
        playData.song &&
        playData.song.audioMp3 &&
        playData.song.audioMp3.path && (
        <div>
          {
            showPlayerList &&
            <div className="sheep-music-player-list">
              <div className="play-list-header">
                <button className="close-button" type="button" onClick={onShowPlayList}><MdClose/></button>
              </div>
              <PlayerPlayList
                songs={playList}
                playPauseSong={onPlayById}
                playData={playData}
                play={play}
              />
            </div>
          }
    
          <div className="sheep-music-player">
            <SongPlayer
              playing={play}
              playPause={onPlayPause}
              onPrevNext={onPlayById}
              onShowPlayList={onShowPlayList}
              onMixPlayList={onMixPlayList}
              playData={playData}
            />
          </div>
        </div>

      )}
    </Fragment>
  );
}

AudioPlayer.propTypes = {
  play: PropTypes.bool,
  showPlayer: PropTypes.bool,
  showPlayerList: PropTypes.bool,
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
  playList: PropTypes.array,
  onPlayPause: PropTypes.func.isRequired,
  onPlayById: PropTypes.func.isRequired,
  onShowPlayList: PropTypes.func.isRequired,
  onMixPlayList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  play: makeSelectPlay(),
  showPlayer: makeSelectShowPlayer(),
  showPlayerList: makeSelectShowPlayerList(),
  playData: makeSelectAudioPlayData(),
  playList: makeSelectAudioPlayerList(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPlayPause: () => dispatch(setPlayPause()),
    onPlayById: listId => dispatch(setPlayByListId(listId)),
    onShowPlayList: () => dispatch(setShowPlayList()),
    onMixPlayList: () => dispatch(mixPlayList()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AudioPlayer);
