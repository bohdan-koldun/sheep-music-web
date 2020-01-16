import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddSongDomain = state => state.addSong || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectAddSongDomain,
    songState => songState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAddSongDomain,
    songState => songState.error,
  );

const makeSelectSongData = () =>
  createSelector(
    selectAddSongDomain,
    songState => songState.song,
  );

const makeSelectResultAdding = () =>
  createSelector(
    selectAddSongDomain,
    songState => songState.result,
  );

export {
  selectAddSongDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectSongData,
  makeSelectResultAdding,
};
