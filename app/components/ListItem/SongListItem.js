/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import ReactTooltip from 'react-tooltip';
import { MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md';
import messages from 'components/Player/messages';

class SongListItem extends React.Component {
  render() {
    const { song, play, playData, playPauseSong } = this.props;
    const { intl } = this.context;

    return (
      <li className="song-list-item">
        <button
          type="button"
          onClick={() => playPauseSong(song)}
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
        <Link to={`/song/${song.slug}`}>{song.title}</Link>
        <br />
        <ReactTooltip place="top" type="dark" effect="float" />
      </li>
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
