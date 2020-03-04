import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { JsonLd } from 'react-schemaorg';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { SongPlayList, AlbumPictureListCarousel } from 'components/List';
import Loader from 'components/Loader';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isAdminOrModerator } from 'utils/checkPermissions';
import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
import { MdModeEdit } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { SongsMessage, AlbumsMessage } from 'components/Message';
import Breadcrumb from 'components/Breadcrumb';
import { useIntl } from 'containers/LanguageProvider';
import menuMessages from 'components/Menu/messages';
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
  loading,
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

  const title =
    authorData &&
    `${authorData.title}${
      authorData.songs ? ` | ${authorData.songs.length} песен(я)` : ''
    } | Песни, Слова, Аккорды, Видео`;

  const description =
    authorData &&
    `Исполнитель ${
      authorData.title
    }: слова, текст, слушать аудио онлайн, скачать, аккорды, видео, минус`;

  const canonicalUrl = `https://sheep-music.com/author/${authorData.slug}`;

  return (
    <React.Fragment>
      {!loading && authorData ? (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />
            <meta
              name="og:image"
              content={authorData.thumbnail && authorData.thumbnail.path}
            />
            <meta name="og:url" content={canonicalUrl} />
            <meta name="og:site_name" content="Sheep Music" />
            <meta name="fb:app_id" content="464243220625029" />
          </Helmet>
          <JsonLd
            item={{
              '@context': 'https://schema.org',
              '@type': 'MusicGroup',
              '@id': canonicalUrl,
              name: authorData.title,
              description: authorData.description,
              logo: {
                '@type': 'ImageObject',
                url: authorData.thumbnail && authorData.thumbnail.path,
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
                  name: 'Исполнители',
                  item: 'https://sheep-music.com/author',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: authorData.title,
                  item: canonicalUrl,
                },
              ],
            }}
          />
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
              {authorData.title} |{' '}
              <FormattedMessage {...commonMessages.author} />
              {isAdminOrModerator(user) && (
                <Link
                  to={`/edit/author/${authorData.slug}`}
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
          <AlbumPictureListCarousel albums={authorData.albums} />
          <br /> <br />
        </div>
      ) : (
        (loading && <Loader />) || null
      )}
    </React.Fragment>
  );
}

Author.propTypes = {
  loading: PropTypes.bool,
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
