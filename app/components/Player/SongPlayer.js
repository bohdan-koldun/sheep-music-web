import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeUp,
  MdVolumeOff,
  MdRepeat,
  MdShuffle,
  MdVerticalAlignBottom,
  MdQueueMusic,
} from 'react-icons/md';
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
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
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
    // const { loop, random } = this.state;
    // const keysSong = Object.keys(this.props.songs.songs);
    // if (loop) this.setState({ playing: loop });
    // else if (random) {
    //     this.handlePrevNext(keysSong[Math.floor(Math.random() * keysSong.length)]);
    // }
    //   this.handlePrevNext(this.props.songs.nextSong);
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

  handlePrevNext = () => {
    // if (id) {
    //   const { changeCurrentSong, songs } = this.props;
    //   let nextSong;
    //   let prevSong;
    //   Object.keys(songs.songs).some((currId, index, arr) => {
    //     if (currId === id) {
    //       nextSong = arr[index + 1];
    //       prevSong = arr[index - 1];
    //     }
    //     return currId === id;
    //   });
    //   changeCurrentSong({
    //     prevSong,
    //     currentSong: id,
    //     nextSong,
    //   });
    // }
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
    } = this.state;

    const { song, playPause } = this.props;

    const { intl } = this.context;

    return (
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
          url={song.audioMp3.path}
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
            <button type="button" className="icon-button">
              <MdSkipPrevious
                data-tip={intl.formatMessage(messages.prev)}
                className="player-icon"
              />
            </button>
            <button type="button" onClick={playPause} className="icon-button">
              {!playing ? (
                <MdPlayArrow
                  data-tip={intl.formatMessage(messages.play)}
                  className="player-icon play-icon"
                />
              ) : (
                <MdPause
                  data-tip={intl.formatMessage(messages.pause)}
                  className="player-icon play-icon"
                />
              )}
            </button>
            <button type="button" className="icon-button">
              <MdSkipNext
                data-tip={intl.formatMessage(messages.next)}
                className="player-icon play-icon"
              />
            </button>
            <span>
              <Duration seconds={played * duration} />
              {' / '}
              <Duration seconds={duration} />
            </span>
          </div>

          <div className="group-control-second">
            <SongImg song={song} className="song-player-img" />
            <div>
              <b>{song.title}</b>
              <br />
              <span>{song.author && song.author.title}</span>
            </div>
            <button type="button" className="icon-button">
              <a href={song.audioMp3.path} download>
                <MdVerticalAlignBottom
                  data-tip={intl.formatMessage(messages.download)}
                  className="player-icon"
                />
              </a>
            </button>
            <button type="button" className="icon-button">
              <MdQueueMusic
                data-tip={intl.formatMessage(messages.list)}
                className="player-icon"
              />
            </button>
          </div>
          <div className="group-control-third">
            <VolumeSlider value={volume * 1000} onChange={this.setVolume} />
            <button
              type="button"
              onClick={this.toggleMuted}
              className="icon-button"
            >
              {!muted ? (
                <MdVolumeUp
                  data-tip={intl.formatMessage(messages.volumeOff)}
                  className="player-icon"
                />
              ) : (
                <MdVolumeOff
                  data-tip={intl.formatMessage(messages.volumeOn)}
                  className="player-icon"
                />
              )}
            </button>
            <button
              type="button"
              onClick={this.toggleLoop}
              className="icon-button"
            >
              <MdRepeat
                data-tip={intl.formatMessage(messages.loop)}
                className={classNames('player-icon', { 'icon-active': loop })}
              />
            </button>
            <button type="button" className="icon-button">
              <MdShuffle
                className="player-icon"
                data-tip={intl.formatMessage(messages.shuffle)}
              />
            </button>
          </div>
        </div>
        <ReactTooltip place="top" type="dark" effect="float" />
      </div>
    );
  }
}

SongPlayer.propTypes = {
  playing: PropTypes.bool.isRequired,
  playPause: PropTypes.func.isRequired,
  song: PropTypes.shape({
    id: PropTypes.number,
    audioMp3: PropTypes.object,
  }),
};

SongPlayer.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default SongPlayer;
