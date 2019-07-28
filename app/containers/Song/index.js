/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {
  MdCloudDownload,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
} from 'react-icons/md';

import { SongImg } from 'components/Img';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setSong, setPlayPause } from 'containers/AudioPlayer/actions';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongData,
} from './selectors';
import { loadSong } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './Song.scss';

export function Song({
  songData,
  onLoadSong,
  match,
  play,
  playData,
  onPlaySong,
  onPlayPause,
}) {
  useInjectReducer({ key: 'song', reducer });
  useInjectSaga({ key: 'song', saga });

  useEffect(() => {
    onLoadSong(match.params.slug);
  }, []);

  const playPauseSong = () => {
    if (playData && songData && songData.id === playData.song.id) {
      onPlayPause(songData.id);
    } else {
      onPlaySong(songData);
    }
  };

  return (
    <React.Fragment>
      {songData ? (
        <div>
          <Helmet>
            <title>{songData.title}</title>
            <meta name="description" content="Description of Song" />
          </Helmet>

          <div className="song-page-header">
            <SongImg song={songData} className="song-page-img" />
            <div className="song-metadata">
              <h1>{songData.title}</h1>
              {songData.author && (
                <div>
                  <span>
                    {'    '}
                    <FormattedMessage {...messages.author} />:{' '}
                  </span>
                  <Link to={`/author/${songData.author.slug}`}>
                    {songData.author.title}
                  </Link>
                </div>
              )}
              {songData.album && (
                <div>
                  <span>
                    {'    '}
                    <FormattedMessage {...messages.album} />:{' '}
                  </span>
                  <Link to={`/album/${songData.album.slug}`}>
                    {songData.album.title}
                  </Link>
                </div>
              )}
              {songData.audioMp3 ? (
                <div>
                  <button
                    type="button"
                    onClick={playPauseSong}
                    className="icon-button"
                  >
                    {play && playData && songData.id === playData.song.id ? (
                      <MdPauseCircleFilled
                        //     data-tip={intl.formatMessage(messages.pause)}
                        className="song-icon"
                      />
                    ) : (
                      <MdPlayCircleFilled
                        //    data-tip={intl.formatMessage(messages.play)}
                        className="song-icon"
                      />
                    )}
                  </button>
                  <a href={songData.audioMp3.path} download>
                    <MdCloudDownload
                      //  data-tip={intl.formatMessage(messages.download)}
                      className="song-icon"
                    />
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <pre>{songData.text}</pre>
          {songData.video && (
            <ReactPlayer
              url={songData.video}
              config={{
                youtube: {
                  playerVars: { showinfo: 0, controls: 1 },
                },
              }}
            />
          )}
        </div>
      ) : null}
    </React.Fragment>
  );
}

Song.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  songData: PropTypes.object,
  onLoadSong: PropTypes.func,
  onPlaySong: PropTypes.func,
  onPlayPause: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
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
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  songData: makeSelectSongData(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSong: slug => dispatch(loadSong(slug)),
    onPlaySong: song => dispatch(setSong(song)),
    onPlayPause: () => dispatch(setPlayPause()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Song);
