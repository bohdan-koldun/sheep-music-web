import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { SongPlayList, AlbumPictureList } from 'components/List';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import checkUserPermissions from 'utils/checkPermissions';
import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
import { MdModeEdit } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { SongsMessage, AlbumsMessage } from 'components/Message';
import Breadcrumb from 'components/Breadcrumb';
import { useIntl } from 'containers/LanguageProvider';
import menuMessages from 'components/SideMenu/messages';
import commonMessages from 'translations/common-messages';
import { makeSelectUser } from 'containers/App/selectors';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorData,
} from './selectors';
import { loadAuthor } from './actions';
import reducer from './reducer';
import saga from './saga';
import './Author.scss';

export function Author({
  onLoadAuthor,
  match,
  authorData,
  play,
  playData,
  onPlaySongList,
  onPlayPause,
  user,
}) {
  useInjectReducer({ key: 'author', reducer });
  useInjectSaga({ key: 'author', saga });

  const intl = useIntl();

  useEffect(() => {
    onLoadAuthor(match.params.slug);
  }, []);

  const playPauseSong = song => {
    if (playData && playData.song && song && song.id === playData.song.id) {
      onPlayPause(song.id);
    } else if (song && song.audioMp3 && song.audioMp3.path) {
      onPlaySongList(song, authorData.songs || []);
    }
  };

  return (
    <React.Fragment>
      {authorData && (
        <div>
          <Helmet>
            <title>
              {authorData.title}{' '}
              {authorData.songs ? ` | ${authorData.songs.length} песен(я)` : ''}
              {` | Песни, Слова, Аккорды, Видео`}
            </title>
            <meta
              name="description"
              content={`Автор ${
                authorData.title
              }: слова, текст, слушать аудио онлайн, скачать, аккорды, видео, минус`}
            />
            <link
              rel="canonical"
              href={`https://sheep-music.com/author/${authorData.slug}`}
            />
            <script type="application/ld+json">
              {`
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Исполнители",
              "item": "https://sheep-music.com/authors"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "${authorData.title}",
              "item": "https://sheep-music.com/author/${authorData.slug}"
            }]
            `}
            </script>
          </Helmet>
          <Breadcrumb
            pageList={[
              {
                link: '/authors',
                name: intl.formatMessage(menuMessages.authors),
              },
              { link: `/author/${authorData.slug}`, name: authorData.title },
            ]}
          />
          <div className="author-header">
            {authorData.thumbnail && (
              <img
                src={authorData.thumbnail.path}
                alt={authorData.title}
                className="author-img"
              />
            )}
            <h1>
              <FormattedMessage {...commonMessages.author} /> {authorData.title}
              {checkUserPermissions(user, ['admin', 'moderator']) && (
                <Link
                  to={`/edit/author/${authorData.slug}`}
                  target="_blank"
                  className="author-edit-link"
                >
                  {' '}
                  <MdModeEdit data-tip="edit author" className="author-icon" />
                </Link>
              )}
            </h1>
          </div>
          <div className="author-dscription">{authorData.description}</div>
          <span>
            <b>{(authorData.songs && authorData.songs.length) || 0}</b>{' '}
            <SongsMessage
              count={(authorData.songs && authorData.songs.length) || 0}
            />
          </span>
          <SongPlayList
            songs={authorData.songs}
            playPauseSong={playPauseSong}
            playData={playData}
            play={play}
          />
          <br />
          <span>
            <b>{(authorData.albums && authorData.albums.length) || 0}</b>{' '}
            <AlbumsMessage
              count={(authorData.albums && authorData.albums.length) || 0}
            />
          </span>
          <AlbumPictureList albums={authorData.albums} />
          <br /> <br />
        </div>
      )}
    </React.Fragment>
  );
}

Author.propTypes = {
  authorData: PropTypes.object,
  onLoadAuthor: PropTypes.func,
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
  authorData: makeSelectAuthorData(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAuthor: slug => dispatch(loadAuthor(slug)),
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
)(Author);
