/* eslint-disable indent */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { JsonLd } from 'react-schemaorg';
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
import iTunesImg from './images/itunes.png';
import googlePlayImg from './images/googleplay.png';
import youtubeMusicImg from './images/youtubemusic.png';
import soundCloudImg from './images/soundcloud.png';
import deezerImg from './images/deezer.png';

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

  const thumbnail = albumData.thumbnail && albumData.thumbnail.path;

  const { youtubeMusic, googlePlay, deezer, soundCloud, iTunes } = albumData;

  const songList =
    albumData &&
    albumData.songs &&
    albumData.songs.map(song => ({
      ...song,
      author: albumData.author,
      album: {
        title: albumData.title,
        thumbnail: albumData.thumbnail,
      },
    }));

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
            <meta name="og:image" content={thumbnail} />
            <meta name="og:url" content={canonicalUrl} />
            <meta name="og:site_name" content="Sheep Music" />
            <meta name="fb:app_id" content="464243220625029" />
          </Helmet>
          <JsonLd
            item={{
              '@context': 'http://schema.org',
              '@type': 'MusicAlbum',
              name: albumData.title,
              image: thumbnail || '',
              byArtist: {
                '@type': 'MusicGroup',
                name: (albumData.author && albumData.author.title) || '',
              },
              sameAs: [
                youtubeMusic,
                googlePlay,
                deezer,
                soundCloud,
                iTunes,
              ].filter(url => url),
              track: {
                '@type': 'ItemList',
                numberOfItems: albumData.songs ? albumData.songs.length : 0,
                itemListElement: albumData.songs
                  ? albumData.songs.map((song, i) => ({
                      '@type': 'ListItem',
                      position: i + 1,
                      item: {
                        '@type': 'MusicRecording',
                        name: song.title,
                      },
                    }))
                  : [],
              },
              url: canonicalUrl,
            }}
          />
          <JsonLd
            item={{
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Альбомы',
                  item: 'https://sheep-music.com/albums',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: albumData.title,
                  item: canonicalUrl,
                },
              ],
            }}
          />
          {thumbnail ? (
            <JsonLd
              item={{
                '@context': 'http://schema.org',
                '@type': 'ImageObject',
                contentUrl: thumbnail,
                datePublished: albumData.createdAt,
                name: albumData.title,
              }}
            />
          ) : null}
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
            songs={songList}
            playPauseSong={playPauseSong}
            playData={playData}
            play={play}
          />
          <section className="album-videos">
            {(videoSongs && videoSongs.length && (
              <React.Fragment>
                <h3>
                  <FormattedMessage {...messages.albumVideo} />
                </h3>
                <VideoYoutubeListCarousel songs={videoSongs} />
              </React.Fragment>
            )) ||
              null}
          </section>

          <section className="album-social">
            <h3>
              <FormattedMessage {...messages.availableOn} />
            </h3>
            <div className="album-social-list">
              <a href={iTunes} target="_blank">
                <img
                  src={iTunesImg}
                  className={classNames({ 'no-availavle': !iTunes })}
                  alt="itunes"
                />
              </a>
              <a href={googlePlay} target="_blank">
                <img
                  src={googlePlayImg}
                  className={classNames({
                    'no-availavle': !googlePlay,
                  })}
                  alt="google play"
                />
              </a>
              <a href={youtubeMusic} target="_blank">
                <img
                  src={youtubeMusicImg}
                  className={classNames({
                    'no-availavle': !youtubeMusic,
                  })}
                  alt="youtube music"
                />
              </a>
              <a href={soundCloud} target="_blank">
                <img
                  src={soundCloudImg}
                  className={classNames({
                    'no-availavle': !soundCloud,
                  })}
                  alt="sound cloud"
                />
              </a>
              <a href={deezer} target="_blank">
                <img
                  src={deezerImg}
                  className={classNames({
                    'no-availavle': !deezer,
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
