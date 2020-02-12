/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { PlayerPlayList } from 'components/List';
import { useIntl } from 'containers/LanguageProvider';
import {
  MdClose,
} from 'react-icons/md';
import { FiPlay, FiPause } from "react-icons/fi";
import { SongImg } from 'components/Img';
import { useInjectReducer } from 'utils/injectReducer';
import { SongPlayer } from 'components/Player';
import commonMessages from 'translations/common-messages';
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

  const { song = {} } = (playData || {});
  const { audioMp3 = {}, phonogramMp3 = {}, playMinus } = song;

  const isPlayPath = (!playMinus && audioMp3.path) || (playMinus && phonogramMp3.path);

  const intl = useIntl();

  return (
    <Fragment>
      {
        showPlayer &&
        isPlayPath && (
          <div>
            {
              showPlayerList &&
            <div className="sheep-music-player-list">
              <div className="play-list-header">
                <button className="close-button" type="button" onClick={onShowPlayList}><MdClose/></button>
              </div>
              <div className="sheep-music-player-list-content">
                <div className="full-player-left-wrapper">
                  <div className="full-player-card-wrapper">
                    {
                      playMinus &&
                      <div className="minus-label">
                        {intl
                          .formatMessage(commonMessages.soundtrack)
                          .toUpperCase()}
                      </div>
                    }
                    <div className="img-wrapper">
                      <SongImg song={song} className="full-player-img" />
                      <div className="dark-line"></div>
                    </div>
                   
                    <div className="full-player-play-song-info">
                      {song.title} - <br/>{song.author && song.author.title}
                    </div>
                    <button
                      type="button"
                      onClick={() => onPlayPause()}
                      className="play-card-button"
                    >
                      {play ? (
                        <FiPause
                          className="play-card-icon"
                        />
                      ) : (
                        <FiPlay
                          className="play-card-icon"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <PlayerPlayList
                  songs={playList}
                  playPauseSong={onPlayById}
                  playData={playData}
                  play={play}
                />
              </div>
            </div>
            }
    
            <div className="sheep-music-player">
              <SongPlayer
                playing={play}
                playPause={() => onPlayPause(playMinus)}
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

AudioPlayer.contextTypes = {
  intl: PropTypes.object.isRequired,
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
    onPlayPause: playMinus => dispatch(setPlayPause(playMinus)),
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
