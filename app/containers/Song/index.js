/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {
  MdCloudDownload,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
} from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa';
import { SongPdfGenerator } from 'components/Pdf';
import { SongImg } from 'components/Img';
import { DownloadModal } from 'components/Modal';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setSong, setPlayPause } from 'containers/AudioPlayer/actions';
import { useIntl } from 'containers/LanguageProvider';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import playerMessages from 'components/Player/messages';
import commonMessages from 'translations/common-messages';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongData,
} from './selectors';
import { loadSong } from './actions';
import reducer from './reducer';
import saga from './saga';
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

  const intl = useIntl();

  useEffect(() => {
    onLoadSong(match.params.slug);
  }, []);

  const [showDownload, setShowDownload] = useState(false);

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
            <title>
              {songData.title}{' '}
              {songData.author ? ` | ${songData.author.title}` : ''}
              {` | Слова, Аккорды, Видео`}
            </title>
            <meta
              name="description"
              content={`${
                songData.title
              }: слова, текст, слушать аудио онлайн, скачать, аккорды, видео, минус`}
            />
          </Helmet>

          <div className="song-page-header">
            <SongImg song={songData} className="song-page-img" />
            <div className="song-metadata">
              <h1>{songData.title}</h1>
              {songData.author && (
                <div>
                  <span>
                    {'    '}
                    <FormattedMessage {...commonMessages.author} />:{' '}
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
                    <FormattedMessage {...commonMessages.album} />:{' '}
                  </span>
                  <Link to={`/album/${songData.album.slug}`}>
                    {songData.album.title}
                  </Link>
                </div>
              )}
              <SongPdfGenerator song={songData} />
              <div className="song-icons-wrapper">
                {songData.audioMp3 ? (
                  <React.Fragment>
                    <button
                      type="button"
                      onClick={playPauseSong}
                      className="icon-button"
                    >
                      {play && playData && songData.id === playData.song.id ? (
                        <MdPauseCircleFilled
                          data-tip={intl.formatMessage(playerMessages.pause)}
                          className="song-icon"
                        />
                      ) : (
                        <MdPlayCircleFilled
                          data-tip={intl.formatMessage(playerMessages.play)}
                          className="song-icon"
                        />
                      )}
                    </button>
                    <MdCloudDownload
                      data-tip={intl.formatMessage(playerMessages.download)}
                      onClick={() => setShowDownload(true)}
                      className="song-icon"
                    />
                    <DownloadModal
                      isOpen={showDownload}
                      onCloseModal={() => setShowDownload(false)}
                      downloadUrl={songData.audioMp3.path}
                      title={songData.title}
                    />
                  </React.Fragment>
                ) : null}
                {songData.video && (
                  <Link to={`/video/${songData.slug}`} target="_blank">
                    <FaYoutube data-tip="youtube" className="song-icon" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <pre dangerouslySetInnerHTML={{ __html: songData.text }} />
          {songData.video && (
            <div className="player-wrapper">
              <ReactPlayer
                url={songData.video}
                className="react-player"
                config={{
                  youtube: {
                    playerVars: { showinfo: 0, controls: 1 },
                  },
                }}
                width="100%"
                height="100%"
              />
            </div>
          )}
          <div className="tags">
            {songData.tags &&
              songData.tags.map(tag => (
                <span className="song-tag" key={tag.name}>
                  {tag.name}
                </span>
              ))}
          </div>
        </div>
      ) : null}
      <ReactTooltip place="top" type="dark" effect="float" />
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
