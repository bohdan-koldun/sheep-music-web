import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditAlbumDomain = state => state.editAlbum || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectEditAlbumDomain,
    albumState => albumState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectEditAlbumDomain,
    albumState => albumState.error,
  );

const makeSelectAlbumData = () =>
  createSelector(
    selectEditAlbumDomain,
    albumState => albumState.album,
  );

const makeSelectAuthorsData = () =>
  createSelector(
    selectEditAlbumDomain,
    albumState => albumState.authors,
  );

export {
  selectEditAlbumDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumData,
  makeSelectAuthorsData,
};
