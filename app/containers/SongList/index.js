/* eslint-disable indent */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import Pagination from 'components/Pagination';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
import { SongPlayList } from 'components/List';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import { loadSongList } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export function SongList({
  songs,
  onLoadSongList,
  location,
  onPaginate,
  onPlaySongList,
  onPlayPause,
  play,
  playData,
}) {
  useInjectReducer({ key: 'songList', reducer });
  useInjectSaga({ key: 'songList', saga });

  const paginate = page => {
    onPaginate(page.selected);
    onLoadSongList(page.selected);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    onLoadSongList(params.get('page'));
  }, []);

  const playPauseSong = song => {
    if (playData && playData.song && song && song.id === playData.song.id) {
      onPlayPause(song.id);
    } else if (song && song.audioMp3 && song.audioMp3.path) {
      onPlaySongList(song, songs.results || []);
    }
  };

  return (
    <div>
      <Helmet>
        <title> Песни </title>
        <meta
          name="description"
          content="Христианские песни: слова, аудио, mp3, текст, аккорды"
        />
      </Helmet>
      {songs && songs.results ? (
        <div>
          <SongPlayList
            songs={songs.results}
            playPauseSong={playPauseSong}
            playData={playData}
            play={play}
          />
          <Pagination
            pageCount={songs.countPages}
            forcePage={Number(songs.curPage)}
            onPageChange={paginate}
          />
        </div>
      ) : null}
    </div>
  );
}

SongList.propTypes = {
  songs: PropTypes.shape({
    result: PropTypes.object,
    pageTotal: PropTypes.number,
    total: PropTypes.number,
  }),
  onLoadSongList: PropTypes.func,
  onPaginate: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string,
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
  songs: makeSelectSongList(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSongList: page => dispatch(loadSongList(page)),
    onPaginate: page => dispatch(push(`/songs?page=${page}`)),
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
)(SongList);
