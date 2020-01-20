import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditAlbumDomain = state => state.form || initialState;

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

const makeSelectAuthorsIds = () =>
  createSelector(
    selectEditAlbumDomain,
    albumState => albumState.authors,
  );

const makeSelectAlbumsIds = () =>
  createSelector(
    selectEditAlbumDomain,
    albumState => albumState.albums,
  );

export {
  selectEditAlbumDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorsIds,
  makeSelectAlbumsIds,
};
