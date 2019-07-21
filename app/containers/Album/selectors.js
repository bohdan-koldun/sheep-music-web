import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAlbumDomain = state => state.album || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectAlbumDomain,
    albumState => albumState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAlbumDomain,
    albumState => albumState.error,
  );

const makeSelectAlbumData = () =>
  createSelector(
    selectAlbumDomain,
    albumState => albumState.albumData,
  );

export {
  selectAlbumDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumData,
};
