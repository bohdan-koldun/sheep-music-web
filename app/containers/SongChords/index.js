/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
import React, { useEffect, useState, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import ReactGA from 'react-ga';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import {
  MdCloudDownload,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdModeEdit,
  MdAudiotrack,
} from 'react-icons/md';
import { FaYoutube, FaCopy } from 'react-icons/fa';
import { SongImg, songImgUrl } from 'components/Img';
import Loader from 'components/Loader';
import { DownloadModal } from 'components/Modal';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isAdminOrModerator } from 'utils/checkPermissions';
import Breadcrumb from 'components/Breadcrumb';
import { useIntl } from 'containers/LanguageProvider';
import menuMessages from 'components/Menu/messages';
import { setSong, setPlayPause } from 'containers/AudioPlayer/actions';
import { makeSelectUser } from 'containers/App/selectors';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import playerMessages from 'components/Player/messages';
import commonMessages from 'translations/common-messages';
import ChordsTransposer from 'components/chords/chords-transposer';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongChordsData,
} from './selectors';
import { loadSongChords } from './actions';
import reducer from './reducer';
import saga from './saga';
import './SongChords.scss';

export function SongChords({
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
  useInjectReducer({ key: 'songChord', reducer });
  useInjectSaga({ key: 'songChord', saga });

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
    } | Аккорды, Слова, Видео`;

  const description =
    songData &&
    `${
      songData.title
    }: слова, текст, слушать аудио онлайн, скачать, аккорды, видео, минус`;

  const canonicalUrl =
    songData && `https://sheep-music.com/chord/${songData.slug}`;

  const chordsTextarea = useRef();

  const setChordsToClipBoard = () => {
    chordsTextarea.current.select();
    document.execCommand('copy');

    chordsTextarea.current.parentNode.firstChild.classList.add('copied-text');

    setTimeout(() => {
      chordsTextarea.current.parentNode.firstChild.classList.remove('copied-text');
    }, 500);
  };

  return (
    <Fragment>
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
          </Helmet>

          <Breadcrumb
            pageList={[
              {
                link: '/songs',
                name: intl.formatMessage(menuMessages.songs),
              },
              { link: `/chord/${songData.slug}`, name: songData.title },
            ]}
          />

          <div className="song-page-header">
            <SongImg song={songData} className="song-page-img" />
            <div className="song-metadata">
              <h1>
                {songData.title} |{' '}
                <FormattedMessage {...commonMessages.chords} />
              </h1>
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
                <button
                  type="button"
                  onClick={() => {
                    setChordsToClipBoard();
                    ReactGA.event({
                      category: 'Song',
                      action: 'click copy song',
                    });
                  }}
                  className="icon-button"
                >
  
                  <FaCopy
                    data-tip={intl.formatMessage(commonMessages.copy)}
                    data-for='copy-chords'
                    style={{fontSize: '30px'}}
                    className="song-icon"
                  />
                  <ReactTooltip id='copy-chords'/>
                </button>
                {songData.audioMp3 ? (
                  <Fragment>
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
                      {play &&
                      playData &&
                      songData.id === playData.song.id &&
                      !playData.song.playMinus ? (
                          <MdPauseCircleFilled
                            data-tip={intl.formatMessage(playerMessages.pause)}
                            data-for="play-pause"
                            className="song-icon"
                          />
                
                        ) : (
                          <MdPlayCircleFilled
                            data-tip={intl.formatMessage(playerMessages.play)}
                            data-for="play-play"
                            className="song-icon"
                          />
                        )}
                      <ReactTooltip id="play-pause" />
                      <ReactTooltip id="play-play" />
                    </button>
                    <MdCloudDownload
                      data-tip={intl.formatMessage(playerMessages.download)}
                      data-for='download-song'
                      onClick={() => setShowDownload(true)}
                      className="song-icon"
                    />
                    <ReactTooltip id='download-song'/>
                    <DownloadModal
                      isOpen={showDownload}
                      onCloseModal={() => setShowDownload(false)}
                      downloadUrl={songData.audioMp3.path}
                      title={songData.title}
                    />
                  </Fragment>
                ) : null}
                {songData.video && (
                  <Link to={`/video/${songData.slug}`} target="_blank">
                    <FaYoutube data-tip="youtube" data-for='youtube' className="song-icon" />
                    <ReactTooltip id='youtube'/>
                  </Link>
                )}
                {isAdminOrModerator(user) && (
                  <Fragment>
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
                  </Fragment>
                )}
                <Link
                  to={`/song/${songData.slug}`}
                  className="yellow-button-link"
                >
                  {' '}
                  <FormattedMessage {...commonMessages.words} />
                </Link>
              </div>
            </div>
          </div>
          <ChordsTransposer song={songData} chordsTextareaRef={chordsTextarea} setChordsToClipBoard={setChordsToClipBoard} />
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
    </Fragment>
  );
}

SongChords.propTypes = {
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
  songData: makeSelectSongChordsData(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSong: slug => dispatch(loadSongChords(slug)),
    onPlaySong: (song, playMinus) => dispatch(setSong(song, playMinus)),
    onPlayPause: playMinus => dispatch(setPlayPause(playMinus)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SongChords);
