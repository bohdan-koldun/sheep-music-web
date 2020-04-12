import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTopAlbmsDomain = state => state.topSongsState || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectTopAlbmsDomain,
    topSongsState => topSongsState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectTopAlbmsDomain,
    topSongsState => topSongsState.error,
  );

const makeSelectTopSongs = () =>
  createSelector(
    selectTopAlbmsDomain,
    topSongsState => topSongsState.songs,
  );

export {
  selectTopAlbmsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectTopSongs,
};
