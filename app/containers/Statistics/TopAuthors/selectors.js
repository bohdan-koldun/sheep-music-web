import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTopAlbmsDomain = state => state.topAuthorsState || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectTopAlbmsDomain,
    topAuthorsState => topAuthorsState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectTopAlbmsDomain,
    topAuthorsState => topAuthorsState.error,
  );

const makeSelectTopAuthors = () =>
  createSelector(
    selectTopAlbmsDomain,
    topAuthorsState => topAuthorsState.authors,
  );

export {
  selectTopAlbmsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectTopAuthors,
};
