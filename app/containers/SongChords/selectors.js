import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSongChordsDomain = state => state.songChord || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectSongChordsDomain,
    songState => songState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectSongChordsDomain,
    songState => songState.error,
  );

const makeSelectSongChordsData = () =>
  createSelector(
    selectSongChordsDomain,
    songState => songState.songData,
  );

export {
  selectSongChordsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectSongChordsData,
};
