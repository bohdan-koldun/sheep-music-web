import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSongDomain = state => state.song || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectSongDomain,
    songState => songState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectSongDomain,
    songState => songState.error,
  );

const makeSelectSongData = () =>
  createSelector(
    selectSongDomain,
    songState => songState.songData,
  );

export {
  selectSongDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectSongData,
};
