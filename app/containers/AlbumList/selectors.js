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

const makeSelectAlbumListPage = () =>
  createSelector(
    selectAlbumListDomain,
    songState => songState.page,
  );

const makeSelectAlbumListSearch = () =>
  createSelector(
    selectAlbumListDomain,
    songState => songState.search,
  );

const makeSelectAlbumListFilter = () =>
  createSelector(
    selectAlbumListDomain,
    songState => songState.filter,
  );

export {
  selectAlbumListDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumList,
  makeSelectAlbumListPage,
  makeSelectAlbumListSearch,
  makeSelectAlbumListFilter,
};
