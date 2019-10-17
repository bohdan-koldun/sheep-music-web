import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditSongDomain = state => state.editSong || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectEditSongDomain,
    songState => songState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectEditSongDomain,
    songState => songState.error,
  );

const makeSelectSongData = () =>
  createSelector(
    selectEditSongDomain,
    songState => songState.song,
  );

export {
  selectEditSongDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectSongData,
};
