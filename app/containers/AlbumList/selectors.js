import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAlbumListDomain = state => state.albumList || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectAlbumListDomain,
    albumState => albumState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAlbumListDomain,
    albumState => albumState.error,
  );

const makeSelectAlbumList = () =>
  createSelector(
    selectAlbumListDomain,
    albumState => albumState.albums,
  );

export {
  selectAlbumListDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumList,
};
