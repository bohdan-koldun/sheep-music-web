import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTopAlbmsDomain = state => state.topAlbumsState || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectTopAlbmsDomain,
    topAlbumsState => topAlbumsState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectTopAlbmsDomain,
    topAlbumsState => topAlbumsState.error,
  );

const makeSelectTopAlbums = () =>
  createSelector(
    selectTopAlbmsDomain,
    topAlbumsState => topAlbumsState.albums,
  );

export {
  selectTopAlbmsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectTopAlbums,
};
