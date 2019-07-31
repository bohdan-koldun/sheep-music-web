import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { SongPlayList, AlbumPictureList } from 'components/List';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
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

export function Author({
  onLoadAuthor,
  match,
  authorData,
  play,
  playData,
  onPlaySongList,
  onPlayPause,
}) {
  useInjectReducer({ key: 'author', reducer });
  useInjectSaga({ key: 'author', saga });

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
            <title>{authorData.title} - Автор</title>
            <meta name="description" content="Description of Author" />
          </Helmet>
          <h1>Автор {authorData.title}</h1>
          {authorData.thumbnail && (
            <img
              src={authorData.thumbnail.path}
              alt={authorData.title}
              style={{ width: '70%', display: 'block' }}
            />
          )}
          <div>{authorData.description}</div>
          <span>
            <b>{(authorData.songs && authorData.songs.length) || 0}</b> песен
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
            альбомов
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
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  authorData: makeSelectAuthorData(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
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
