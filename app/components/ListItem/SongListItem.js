/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import ReactTooltip from 'react-tooltip';
import ReactGA from 'react-ga';
import { MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md';
import messages from 'components/Player/messages';
import './SongListItem.scss';

class SongListItem extends React.Component {
  render() {
    const { song, play, playData, playPauseSong } = this.props;
    const { intl } = this.context;

    return (
      <div className="song-list-item">
        <button
          type="button"
          onClick={() => {
            playPauseSong(song);
            ReactGA.event({
              category: 'Song List',
              action: 'click play/pause button',
            });
          }}
          className="icon-button"
        >
          <div className="play-button-background" />
          {play && playData && playData.song && song.id === playData.song.id ? (
            <React.Fragment>
              <MdPauseCircleFilled
                data-tip={intl.formatMessage(messages.pause)}
                data-for="pause-play-icon"
                className="song-icon"
              />
              <ReactTooltip
                id="pause-play-icon"
                place="top"
                type="dark"
                effect="float"
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MdPlayCircleFilled
                data-tip={intl.formatMessage(messages.play)}
                data-for="play-play-icon"
                className={classNames('song-icon', {
                  'icon-disable': !(song.audioMp3 && song.audioMp3.path),
                })}
              />
              <ReactTooltip
                id="play-play-icon"
                place="top"
                type="dark"
                effect="float"
              />
            </React.Fragment>
          )}
        </button>
        <Link to={`/song/${song.slug}`} className="song-list-item-description">
          <span className="song-list-title">{song.title}</span>
          <span className="song-list-item-info">
            {song.author && song.author.title}
            {song.author && song.album && ' • '}
            {song.album && song.album.title}
          </span>
        </Link>
      </div>
    );
  }
}

SongListItem.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
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

SongListItem.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default SongListItem;
