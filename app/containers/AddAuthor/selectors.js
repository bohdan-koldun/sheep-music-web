import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddAuthorDomain = state => state.addAuthor || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectAddAuthorDomain,
    authorState => authorState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAddAuthorDomain,
    authorState => authorState.error,
  );

const makeSelectAuthorData = () =>
  createSelector(
    selectAddAuthorDomain,
    authorState => authorState.author,
  );

const makeSelectResultAdding = () =>
  createSelector(
    selectAddAuthorDomain,
    authorState => authorState.result,
  );

export {
  selectAddAuthorDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorData,
  makeSelectResultAdding,
};
