import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { SongPlayList } from 'components/List';
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
  makeSelectAlbumData,
} from './selectors';
import { loadAlbum } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './Album.scss';

export function Album({
  onLoadAlbum,
  match,
  albumData,
  play,
  playData,
  onPlaySongList,
  onPlayPause,
}) {
  useInjectReducer({ key: 'album', reducer });
  useInjectSaga({ key: 'album', saga });

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
            <title>Альбом {albumData.title}</title>
            <meta name="description" content={`Альбом ${albumData.title}`} />
          </Helmet>
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
                <h1>{albumData.title}</h1>
                <div>
                  Альбом{' • '}
                  <Link to={`/author/${albumData.author.slug}`}>
                    {albumData.author.title}
                  </Link>
                </div>
                <div>
                  <b>{(albumData.songs && albumData.songs.length) || 0}</b>{' '}
                  композиции
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
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  albumData: makeSelectAlbumData(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
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
