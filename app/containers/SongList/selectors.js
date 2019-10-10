import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSongListDomain = state => state.songList || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectSongListDomain,
    songState => songState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectSongListDomain,
    songState => songState.error,
  );

const makeSelectSongList = () =>
  createSelector(
    selectSongListDomain,
    songState => songState.songs,
  );

const makeSelectSongListPage = () =>
  createSelector(
    selectSongListDomain,
    songState => songState.page,
  );

const makeSelectSongListSearch = () =>
  createSelector(
    selectSongListDomain,
    songState => songState.search,
  );

const makeSelectSongListFilter = () =>
  createSelector(
    selectSongListDomain,
    songState => songState.filter,
  );

const makeSelectSongListTagsFilter = () =>
  createSelector(
    selectSongListDomain,
    songState => songState.tagsFilter,
  );

export {
  selectSongListDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectSongList,
  makeSelectSongListPage,
  makeSelectSongListSearch,
  makeSelectSongListFilter,
  makeSelectSongListTagsFilter,
};
