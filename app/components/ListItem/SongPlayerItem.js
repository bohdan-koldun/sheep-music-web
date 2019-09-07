/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import ReactTooltip from 'react-tooltip';
import { MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md';
import messages from 'components/Player/messages';
import { SongImg } from '../Img';
import './SongPlayerItem.scss';

class SongPlayerItem extends React.Component {
  render() {
    const { song, play, playData, playPauseSong, listId } = this.props;
    const { intl } = this.context;

    return (
      <div className="song-play-list-item">
        <button
          type="button"
          onClick={() => playPauseSong(listId)}
          className="icon-button"
        >
          {play && playData && playData.song && song.id === playData.song.id ? (
            <MdPauseCircleFilled
              data-tip={intl.formatMessage(messages.pause)}
              className="song-icon"
            />
          ) : (
            <MdPlayCircleFilled
              data-tip={intl.formatMessage(messages.play)}
              className={classNames('song-icon', {
                'icon-disable': !(song.audioMp3 && song.audioMp3.path),
              })}
            />
          )}
        </button>
        <SongImg song={song} className="song-player-img" />
        <div className="song-play-list-item-description">
          <Link to={`/song/${song.slug}`}>{song.title}</Link>
          <br />
          <span>{song.author && song.author.title}</span>
        </div>

        <ReactTooltip place="top" type="dark" effect="float" />
      </div>
    );
  }
}

SongPlayerItem.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  play: PropTypes.bool,
  listId: PropTypes.number,
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

SongPlayerItem.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default SongPlayerItem;
