import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MdVolumeUp, MdVolumeOff, MdVerticalAlignBottom } from 'react-icons/md';
import {
  IoMdRewind,
  IoIosFastforward,
  IoMdPause,
  IoMdPlay,
  IoIosShuffle,
  IoIosRepeat,
  IoMdMore,
} from 'react-icons/io';
import { DownloadModal } from 'components/Modal';
import commonMessages from 'translations/common-messages';
import { SongImg } from '../Img';
import messages from './messages';
import { AudioSlider, VolumeSlider } from './Sliders';

import Duration from './Duration';
import './SongPlayer.scss';

const ESCAPE_KEY = 32;

class SongPlayer extends Component {
  state = {
    playing: this.props.playing,
    random: false,
    volume: 1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    showDownload: false,
  };

  load = () => {
    this.setState({
      played: 0,
      loaded: 0,
    });
  };

  playPause = () => {
    const { playPause } = this.props;
    const { loaded } = this.state;
    if (!loaded || loaded <= 0) {
      this.load();
    }
    this.setState(prevState => ({ playing: !prevState.playing }));
    playPause();
  };

  toggleLoop = () => {
    this.setState(prevState => ({ loop: !prevState.loop }));
  };

  setVolume = value => {
    const volume = parseFloat(value);
    this.setState({ volume, muted: volume === 0 });
  };

  toggleMuted = () => {
    const { volume } = this.state;
    if (volume) {
      this.setState(prevState => ({ muted: !prevState.muted }));
    }
  };

  toggleRandom = () => {
    this.setState(prevState => ({ random: !prevState.random }));
  };

  onPlay = () => {
    this.setState({ playing: true });
  };

  onPause = () => {
    this.setState({ playing: false });
  };

  onSeekMouseDown = () => {
    this.setState({ seeking: true });
  };

  onSeekChange = value => {
    this.setState({ played: parseFloat(value) });
    this.player.seekTo(parseFloat(value));
  };

  onSeekMouseUp = event => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(event.target.value));
  };

  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  onEnded = () => {
    const { loop } = this.state;
    const { playData, onPrevNext } = this.props;
    if (!loop) {
      onPrevNext(playData.nextPlayListId);
    }
  };

  onDuration = duration => {
    this.setState({ duration });
  };

  ref = player => {
    this.player = player;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing !== undefined)
      this.setState({ playing: nextProps.playing });
  }

  handleKeyDown = event => {
    switch (event.keyCode) {
      case ESCAPE_KEY:
        this.props.playPause();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener('keypress', this.handleKbeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyDown);
  }

  render() {
    const {
      playing,
      volume,
      muted,
      loop,
      played,
      duration,
      playbackRate,
      showDownload,
    } = this.state;

    const {
      playData,
      playPause,
      onPrevNext,
      onShowPlayList,
      onMixPlayList,
    } = this.props;

    const { song = {}, nextPlayListId, prevPlayListId } = playData || {};
    const { audioMp3 = {}, phonogramMp3 = {}, playMinus } = song;

    const { intl } = this.context;

    return (
      <React.Fragment>
        <div className="song-player-wrapper">
          <AudioSlider
            value={played * 1000}
            onChange={this.onSeekChange}
            durationComponent={<Duration seconds={played * duration} />}
          />
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="0"
            height="0"
            url={playMinus ? phonogramMp3.path : audioMp3.path}
            playing={playing}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onPlay={this.onPlay}
            onPause={this.onPause}
            onEnded={this.onEnded}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />

          <div className="song-player-control">
            <div className="group-control-first">
              <Link to={`/song/${song.slug}`} className="player-song-link">
                <div className="song-player-img-wrapper">
                  <SongImg song={song} className="song-player-img" />
                  {playMinus && (
                    <div className="minus-label">
                      {intl
                        .formatMessage(commonMessages.soundtrack)
                        .toLowerCase()}
                    </div>
                  )}
                </div>
                <div>
                  <span>{song.title}</span>
                  <br />
                  <span className="author-line">
                    {song.author && song.author.title}
                  </span>
                  <br />
                  <span className="player-timer hide-desktop">
                    <Duration seconds={played * duration} />
                    {' / '}
                    <Duration seconds={duration} />
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() =>
                  (prevPlayListId || prevPlayListId === 0) &&
                  onPrevNext(prevPlayListId)
                }
                className="icon-button"
              >
                <IoMdRewind
                  data-tip={intl.formatMessage(messages.prev)}
                  className={classNames('player-icon', {
                    'icon-disable': !prevPlayListId && prevPlayListId !== 0,
                  })}
                />
              </button>
              <button type="button" onClick={playPause} className="icon-button">
                {!playing ? (
                  <IoMdPlay
                    data-tip={intl.formatMessage(messages.play)}
                    className="player-icon play-icon"
                  />
                ) : (
                  <IoMdPause
                    data-tip={intl.formatMessage(messages.pause)}
                    className="player-icon play-icon"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => nextPlayListId && onPrevNext(nextPlayListId)}
                className="icon-button"
              >
                <IoIosFastforward
                  className={classNames('player-icon', {
                    'icon-disable': !nextPlayListId,
                  })}
                />
              </button>
              <span className="player-timer hide-mobile">
                <Duration seconds={played * duration} />
                {' / '}
                <Duration seconds={duration} />
              </span>
            </div>

            <div className="group-control-second">
              <button type="button" className="icon-button">
                <MdVerticalAlignBottom
                  data-tip={intl.formatMessage(messages.download)}
                  onClick={() => this.setState({ showDownload: true })}
                  className="player-icon"
                />
              </button>
              <button type="button" className="icon-button">
                <IoMdMore
                  data-tip={intl.formatMessage(messages.list)}
                  onClick={() => onShowPlayList()}
                  className="player-icon"
                />
              </button>
              <button
                type="button"
                onClick={this.toggleLoop}
                className="icon-button hide-mobile"
              >
                <IoIosRepeat
                  data-tip={intl.formatMessage(messages.loop)}
                  className={classNames('player-icon', { 'icon-active': loop })}
                />
              </button>
              <button
                type="button"
                onClick={onMixPlayList}
                className="icon-button hide-mobile"
              >
                <IoIosShuffle
                  className="player-icon"
                  data-tip={intl.formatMessage(messages.shuffle)}
                />
              </button>
              <div className="volume-control">
                <button
                  type="button"
                  onClick={this.toggleMuted}
                  className="icon-button"
                >
                  {!muted ? (
                    <MdVolumeUp
                      data-tip={intl.formatMessage(messages.volumeOff)}
                      className="player-icon volume-icon"
                    />
                  ) : (
                    <MdVolumeOff
                      data-tip={intl.formatMessage(messages.volumeOn)}
                      className="volume-icon player-icon"
                    />
                  )}
                </button>
                <VolumeSlider value={volume * 1000} onChange={this.setVolume} />
              </div>
            </div>
          </div>

          <ReactTooltip place="top" type="dark" effect="float" />
        </div>
        <DownloadModal
          isOpen={showDownload}
          onCloseModal={() => {
            this.setState({ showDownload: false });
          }}
          downloadUrl={song.audioMp3.path}
          title={song.title}
        />
      </React.Fragment>
    );
  }
}

SongPlayer.propTypes = {
  playing: PropTypes.bool.isRequired,
  playPause: PropTypes.func.isRequired,
  onPrevNext: PropTypes.func.isRequired,
  onShowPlayList: PropTypes.func.isRequired,
  onMixPlayList: PropTypes.func.isRequired,
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
};

SongPlayer.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default SongPlayer;
