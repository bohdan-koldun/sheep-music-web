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

export {
  selectSongListDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectSongList,
};
