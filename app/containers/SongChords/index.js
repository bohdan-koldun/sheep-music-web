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
} from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa';
import { SongPdfGenerator } from 'components/Pdf';
import { SongImg } from 'components/Img';
import { DownloadModal } from 'components/Modal';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setSong, setPlayPause } from 'containers/AudioPlayer/actions';
import { useIntl } from 'containers/LanguageProvider';
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

  const userRoles =
    user &&
    user.roles &&
    user.roles.map(role => role && role.role.slug).join(',');

  return (
    <React.Fragment>
      {songData ? (
        <div>
          <Helmet>
            <title>
              {songData.title}{' '}
              {songData.author ? ` | ${songData.author.title}` : ''}
              {` | Аккорды, Слова, Видео`}
            </title>
            <meta
              name="description"
              content={`${
                songData.title
              }: слова, текст, слушать аудио онлайн, скачать, аккорды, видео, минус`}
            />
            <link
              rel="canonical"
              href={`https://sheep-music.com/chord/${songData.slug}`}
            />
          </Helmet>

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
              <SongPdfGenerator song={songData} />
              <div className="song-icons-wrapper">
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
                {/admin|moderator/.test(userRoles) && (
                  <Link to={`/edit/song/${songData.slug}`} target="_blank">
                    {' '}
                    <MdModeEdit data-tip="edit song" className="song-icon" />
                  </Link>
                )}
                <Link to={`/song/${songData.slug}`}>
                  {' '}
                  <FormattedMessage {...commonMessages.words} />
                </Link>
              </div>
            </div>
          </div>
          <pre dangerouslySetInnerHTML={{ __html: songData.chords }} />
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
      ) : null}
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