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
import {
  MdCloudDownload,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdModeEdit,
} from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa';
import { SongPdfGenerator } from 'components/Pdf';
import { SongImg, songImgUrl } from 'components/Img';
import Loader from 'components/Loader';
import { DownloadModal } from 'components/Modal';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import checkUserPermissions from 'utils/checkPermissions';
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
                <FormattedMessage {...commonMessages.chords} /> {songData.title}
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
                <SongPdfGenerator song={songData} type="chords" />
                {songData.audioMp3 ? (
                  <React.Fragment>
                    <button
                      type="button"
                      onClick={() => {
                        playPauseSong();
                        ReactGA.event({
                          category: 'Song',
                          action: 'click play/pause button',
                        });
                      }}
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
                {checkUserPermissions(user, ['admin', 'moderator']) && (
                  <Link to={`/edit/song/${songData.slug}`} target="_blank">
                    {' '}
                    <MdModeEdit data-tip="edit song" className="song-icon" />
                  </Link>
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
          {/* <pre dangerouslySetInnerHTML={{ __html: songData.chords }} /> */}
          <ChordsTransposer
            songChords={songData.chords}
            chordsKey={songData.chordsKey}
          />
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
    onPlaySong: song => dispatch(setSong(song)),
    onPlayPause: () => dispatch(setPlayPause()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SongChords);
