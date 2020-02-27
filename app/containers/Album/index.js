/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { SongsMessage } from 'components/Message';
import commonMessages from 'translations/common-messages';
import classNames from 'classnames/bind';
import { MdModeEdit } from 'react-icons/md';
import { SongPlayList, VideoYoutubeListCarousel } from 'components/List';
import Breadcrumb from 'components/Breadcrumb';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isAdminOrModerator } from 'utils/checkPermissions';
import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
import { makeSelectUser } from 'containers/App/selectors';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import { useIntl } from 'containers/LanguageProvider';
import menuMessages from 'components/Menu/messages';
import Loader from 'components/Loader';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumData,
} from './selectors';
import { loadAlbum } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './Album.scss';
import iTunes from './images/itunes.png';
import googlePlay from './images/googleplay.png';
import youtubeMusic from './images/youtubemusic.png';
import soundCloud from './images/soundcloud.png';
import deezer from './images/deezer.png';

export function Album({
  onLoadAlbum,
  loading,
  match,
  albumData,
  play,
  playData,
  onPlaySongList,
  onPlayPause,
  user,
}) {
  useInjectReducer({ key: 'album', reducer });
  useInjectSaga({ key: 'album', saga });

  const intl = useIntl();

  useEffect(() => {
    onLoadAlbum(match.params.slug);
  }, []);

  const playPauseSong = song => {
    if (playData && playData.song && song && song.id === playData.song.id) {
      onPlayPause(song.id);
    } else if (song && song.audioMp3 && song.audioMp3.path) {
      onPlaySongList(song, albumData.songs || []);
    }
  };

  const title =
    albumData &&
    `Альбом ${albumData.title}${
      albumData.author ? ` | ${albumData.author.title}` : ''
    }${
      albumData.songs ? ` | ${albumData.songs.length} песен(я)` : ''
    } | Песни, Слова, Аккорды, Видео`;

  const description =
    albumData &&
    `Альбом ${
      albumData.title
    }: слова, текст, слушать аудио онлайн, скачать, аккорды, видео, минус`;

  const canonicalUrl = `https://sheep-music.com/album/${albumData.slug}`;

  const videoSongs =
    albumData && albumData.songs && albumData.songs.filter(song => song.video);

  return (
    <React.Fragment>
      {!loading && albumData ? (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />
            <meta
              name="og:image"
              content={albumData.thumbnail && albumData.thumbnail.path}
            />
            <meta name="og:url" content={canonicalUrl} />
            <meta name="og:site_name" content="Sheep Music" />
            <meta name="fb:app_id" content="464243220625029" />
          </Helmet>

          <Breadcrumb
            pageList={[
              {
                link: '/albums',
                name: intl.formatMessage(menuMessages.albums),
              },
              { link: `/album/${albumData.slug}`, name: albumData.title },
            ]}
          />

          <section className="album-header">
            {albumData.thumbnail && (
              <img
                src={albumData.thumbnail.path}
                alt={albumData.title}
                className="spin-album-image"
              />
            )}
            <div className="album-description">
              <div>
                <h1>
                  {albumData.title}
                  {isAdminOrModerator(user) && (
                    <Link
                      to={`/edit/album/${albumData.slug}`}
                      className="album-edit-link"
                    >
                      {' '}
                      <MdModeEdit
                        data-tip="edit album"
                        className="album-icon"
                      />
                    </Link>
                  )}
                </h1>
                <div>
                  <FormattedMessage {...commonMessages.album} />
                  {albumData.year && ` • ${albumData.year}`}
                  {albumData.author && (
                    <React.Fragment>
                      {' • '}
                      <Link to={`/author/${albumData.author.slug}`}>
                        {albumData.author.title}
                      </Link>
                    </React.Fragment>
                  )}
                </div>
                <div>
                  <b>{(albumData.songs && albumData.songs.length) || 0}</b>{' '}
                  <SongsMessage
                    count={(albumData.songs && albumData.songs.length) || 0}
                  />
                </div>
              </div>
            </div>
          </section>

          <SongPlayList
            songs={albumData.songs}
            playPauseSong={playPauseSong}
            playData={playData}
            play={play}
          />
          <section className="album-videos">
            {videoSongs && videoSongs.length && (
              <React.Fragment>
                <h3>
                  <FormattedMessage {...messages.albumVideo} />
                </h3>
                <VideoYoutubeListCarousel songs={videoSongs} />
              </React.Fragment>
            ) || null}
          </section>

          <section className="album-social">
            <h3>
              <FormattedMessage {...messages.availableOn} />
            </h3>
            <div className="album-social-list">
              <a href={albumData.iTunes} target="_blank">
                <img
                  src={iTunes}
                  className={classNames({ 'no-availavle': !albumData.iTunes })}
                  alt="itunes"
                />
              </a>
              <a href={albumData.googlePlay} target="_blank">
                <img
                  src={googlePlay}
                  className={classNames({
                    'no-availavle': !albumData.googlePlay,
                  })}
                  alt="google play"
                />
              </a>
              <a href={albumData.youtubeMusic} target="_blank">
                <img
                  src={youtubeMusic}
                  className={classNames({
                    'no-availavle': !albumData.youtubeMusic,
                  })}
                  alt="youtube music"
                />
              </a>
              <a href={albumData.soundCloud} target="_blank">
                <img
                  src={soundCloud}
                  className={classNames({
                    'no-availavle': !albumData.soundCloud,
                  })}
                  alt="sound cloud"
                />
              </a>
              <a href={albumData.deezer} target="_blank">
                <img
                  src={deezer}
                  className={classNames({
                    'no-availavle': !albumData.deezer,
                  })}
                  alt="deezer"
                />
              </a>
            </div>
          </section>
        </div>
      ) : (
        (loading && <Loader />) || null
      )}
    </React.Fragment>
  );
}

Album.propTypes = {
  loading: PropTypes.bool,
  albumData: PropTypes.object,
  onLoadAlbum: PropTypes.func,
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
  onPlaySongList: PropTypes.func,
  onPlayPause: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  albumData: makeSelectAlbumData(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAlbum: slug => dispatch(loadAlbum(slug)),
    onPlaySongList: (song, songList) => dispatch(setSongList(song, songList)),
    onPlayPause: () => dispatch(setPlayPause()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Album);
