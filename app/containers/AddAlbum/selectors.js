import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddAlbumDomain = state => state.addAlbum || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectAddAlbumDomain,
    albumState => albumState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAddAlbumDomain,
    albumState => albumState.error,
  );

const makeSelectAlbumData = () =>
  createSelector(
    selectAddAlbumDomain,
    albumState => albumState.album,
  );

const makeSelectResultAdding = () =>
  createSelector(
    selectAddAlbumDomain,
    albumState => albumState.result,
  );

export {
  selectAddAlbumDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumData,
  makeSelectResultAdding,
};
