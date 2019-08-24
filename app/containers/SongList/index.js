/* eslint-disable no-unused-vars */
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
import { ListFilter } from 'components/Filter';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import {
  loadSongList,
  changeSearch,
  changePage,
  changeFilter,
} from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongList,
  makeSelectSongListPage,
  makeSelectSongListSearch,
  makeSelectSongListFilter,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export function SongList({
  songs,
  onLoadSongList,
  paginate,
  location,
  onPlaySongList,
  onPlayPause,
  play,
  playData,
  page,
  search,
  filter,
  onChangePage,
  onChangeSearch,
  onChangeFilter,
}) {
  useInjectReducer({ key: 'songList', reducer });
  useInjectSaga({ key: 'songList', saga });

  useEffect(() => {
    // const params = new URLSearchParams(location.search);
    // TODO paginate(params.get('page') || 0, search, filter.value);
    onLoadSongList(page, search, filter.value);
  }, [page, search, filter]);

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

      <ListFilter
        search={search}
        filter={filter}
        onChangeSearch={onChangeSearch}
        onChangeFilter={onChangeFilter}
      />

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
            onPageChange={onChangePage}
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
  paginate: PropTypes.func,
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
  page: PropTypes.number,
  search: PropTypes.string,
  filter: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  onChangeSearch: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeFilter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  songs: makeSelectSongList(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
  page: makeSelectSongListPage(),
  search: makeSelectSongListSearch(),
  filter: makeSelectSongListFilter(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSongList: (page, search, filter) =>
      dispatch(loadSongList(page, search, filter)),
    paginate: (page, search, filter) =>
      dispatch(push(`/songs?page=${page}&search=${search}&filter=${filter}`)),
    onPlaySongList: (song, songList) => dispatch(setSongList(song, songList)),
    onPlayPause: () => dispatch(setPlayPause()),
    onChangePage: page => dispatch(changePage(page)),
    onChangeSearch: search => dispatch(changeSearch(search)),
    onChangeFilter: filter => dispatch(changeFilter(filter)),
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
