/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import ReactGA from 'react-ga';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {
  MdCloudDownload,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdModeEdit,
  MdAudiotrack,
  MdFileDownload,
} from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa';
import { SongImg, songImgUrl } from 'components/Img';
import { DownloadModal } from 'components/Modal';
import Loader from 'components/Loader';
import Breadcrumb from 'components/Breadcrumb';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isAdminOrModerator } from 'utils/checkPermissions';
import { setSong, setPlayPause } from 'containers/AudioPlayer/actions';
import { useIntl } from 'containers/LanguageProvider';
import menuMessages from 'components/Menu/messages';
import { makeSelectUser } from 'containers/App/selectors';
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
  user,
  loading,
}) {
  useInjectReducer({ key: 'song', reducer });
  useInjectSaga({ key: 'song', saga });

  const intl = useIntl();

  useEffect(() => {
    onLoadSong(match.params.slug);
  }, []);

  const [showDownload, setShowDownload] = useState(false);

  const playPauseSong = playMinus => {
    if (playData && songData && songData.id === playData.song.id) {
      onPlayPause(playMinus);
    } else {
      onPlaySong(songData, playMinus);
    }
  };

  const title =
    songData &&
    `${songData.title}${
      songData.author ? ` | ${songData.author.title}` : ''
    } | Слова, Аккорды, Видео`;

  const description =
    songData &&
    `${
      songData.title
    }: слова, текст, слушать аудио онлайн, скачать, аккорды, видео, минус`;

  const canonicalUrl =
    songData && `https://sheep-music.com/song/${songData.slug}`;

  return (
    <React.Fragment>
      {!loading && songData ? (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />
            <meta name="og:image" content={songImgUrl(songData)} />
            <meta name="og:url" content={canonicalUrl} />
            <meta name="og:site_name" content="Sheep Music" />
            <meta name="og:video" content={songData.video} />
            <meta name="fb:app_id" content="464243220625029" />

            <script type="application/ld+json">
              {`
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Песни",
              "item": "https://sheep-music.com/songs"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "${songData.title}",
              "item": "${canonicalUrl}"
            }]
            `}
            </script>
          </Helmet>

          <Breadcrumb
            pageList={[
              {
                link: '/songs',
                name: intl.formatMessage(menuMessages.songs),
              },
              { link: `/song/${songData.slug}`, name: songData.title },
            ]}
          />

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
              <div className="song-icons-wrapper">
                {songData.audioMp3 ? (
                  <React.Fragment>
                    <button
                      type="button"
                      onClick={() => {
                        playPauseSong(false);
                        ReactGA.event({
                          category: 'Song',
                          action: 'click play/pause button',
                        });
                      }}
                      className="icon-button"
                    >
                      {play && playData && songData.id === playData.song.id && !playData.song.playMinus ? (
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
                {isAdminOrModerator(user) && (
                  <React.Fragment>
                    <Link to={`/edit/song/${songData.slug}`}>
                      {' '}
                      <MdModeEdit data-tip="edit song" className="song-icon" />
                    </Link>
                    <Link to={`/edit/song_files/${songData.slug}`}>
                      {' '}
                      <MdAudiotrack
                        data-tip="edit song mp3"
                        className="song-icon"
                      />
                    </Link>
                  </React.Fragment>
                )}
                {
                  songData.chords &&
                  <Link
                    to={`/chord/${songData.slug}`}
                    className="yellow-button-link"
                  >
                    {' '}
                    <FormattedMessage {...commonMessages.chords} />
                  </Link>
                }
              </div>
            </div>
          </div>
          {songData.phonogramMp3 && (
            <React.Fragment>
              <hr/>
              <div className="song-minus">
                <span className="title"><FormattedMessage {...commonMessages.soundtrack} />:</span>
                <button
                  type="button"
                  onClick={() => {
                    playPauseSong(true);
                    ReactGA.event({
                      category: 'Song',
                      action: 'click play/pause button',
                    });
                  }}
                  className="icon-button"
                >
                  {play && playData && songData.id === playData.song.id && playData.song.playMinus ? (
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
                <button
                  type="button"
                  onClick={() => setShowDownload(true)}
                  className="icon-button"
                >
                  <FormattedMessage {...playerMessages.download} />
                  <MdFileDownload
                    data-tip={intl.formatMessage(playerMessages.download)}
                    className="song-icon"
                  />
                </button>
                <DownloadModal
                  isOpen={showDownload}
                  onCloseModal={() => setShowDownload(false)}
                  downloadUrl={songData.phonogramMp3.path}
                  title={`${intl.formatMessage(commonMessages.soundtrack)} ${songData.title}`}
                /> 
              </div> 
              <hr/>
            </React.Fragment>
          )}
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
                <Link
                  to={`/songs?tags=${tag.id}`}
                  className="song-tag"
                  key={tag.name}
                >
                  {tag.name}
                </Link>
              ))}
          </div>
        </div>
      ) : (
        (loading && <Loader />) || null
      )}
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
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  songData: makeSelectSongData(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSong: slug => dispatch(loadSong(slug)),
    onPlaySong: (song, playMinus) => dispatch(setSong(song, playMinus)),
    onPlayPause: (playMinus) => dispatch(setPlayPause(playMinus)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Song);
