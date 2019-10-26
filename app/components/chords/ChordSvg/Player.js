/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { MdPlayCircleFilled } from 'react-icons/md';

class SongPlayer extends Component {
  state = {
    playing: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
  };

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
    });
  };

  play = () => {
    if (!this.state.loaded > 0) this.load(this.props.url);
    this.setState({ playing: true });
    this.player.seekTo(0);
  };

  onPlay = () => {
    this.setState({ playing: true });
  };

  onPause = () => {
    this.setState({ playing: false });
  };

  onEnded = () => {
    this.setState({ playing: false });
  };

  ref = player => {
    this.player = player;
  };

  render() {
    const { playing, playbackRate } = this.state;
    // eslint-disable-next-line react/prop-types
    const { url } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPlayer
          ref={this.ref}
          width="0"
          height="0"
          url={url}
          playing={playing}
          playbackRate={playbackRate}
          volume={1}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnded={this.onEnded}
        />
        <span
          onClick={this.play}
          style={{ cursor: 'pointer', borderBottom: '1px dashed grey' }}
        >
          <MdPlayCircleFilled />
          Звук аккорда
        </span>
      </div>
    );
  }
}

export default SongPlayer;
