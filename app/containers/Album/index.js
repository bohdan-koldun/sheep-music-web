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
import { SongPlayList } from 'components/List';
import Breadcrumb from 'components/Breadcrumb';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import checkUserPermissions from 'utils/checkPermissions';
import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
import { makeSelectUser } from 'containers/App/selectors';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import { useIntl } from 'containers/LanguageProvider';
import menuMessages from 'components/Menu/messages';
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

export function Album({
  onLoadAlbum,
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

  return (
    <React.Fragment>
      {albumData && (
        <div>
          <Helmet>
            <title>
              Альбом {albumData.title}{' '}
              {albumData.author ? ` | ${albumData.author.title}` : ''}
              {albumData.songs ? ` | ${albumData.songs.length} песен(я)` : ''}
              {` | Песни, Слова, Аккорды, Видео`}
            </title>
            <meta
              name="description"
              content={`Альбом ${
                albumData.title
              }: слова, текст, слушать аудио онлайн, скачать, аккорды, видео, минус`}
            />
            <link
              rel="canonical"
              href={`https://sheep-music.com/album/${albumData.slug}`}
            />
            <script type="application/ld+json">
              {`"@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Альбомы",
              "item": "https://sheep-music.com/albums"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "${albumData.title}",
              "item": "https://sheep-music.com/album/${albumData.slug}"
            }]`}
            </script>
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

          <div className="album-header">
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
                  {checkUserPermissions(user, ['admin', 'moderator']) && (
                    <Link
                      to={`/edit/album/${albumData.slug}`}
                      target="_blank"
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
                  <FormattedMessage {...commonMessages.album} /> {' • '}
                  {albumData.year && `${albumData.year} • `}
                  <Link to={`/author/${albumData.author.slug}`}>
                    {albumData.author.title}
                  </Link>
                </div>
                <div>
                  <b>{(albumData.songs && albumData.songs.length) || 0}</b>{' '}
                  <SongsMessage
                    count={(albumData.songs && albumData.songs.length) || 0}
                  />
                </div>
              </div>
            </div>
          </div>

          <SongPlayList
            songs={albumData.songs}
            playPauseSong={playPauseSong}
            playData={playData}
            play={play}
          />
          <div className="itunes-googleplay">
            <h3>
              <FormattedMessage {...messages.availableOn} />
            </h3>
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
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

Album.propTypes = {
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
