import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditAuthorDomain = state => state.editAuthor || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectEditAuthorDomain,
    authorState => authorState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectEditAuthorDomain,
    authorState => authorState.error,
  );

const makeSelectAuthorData = () =>
  createSelector(
    selectEditAuthorDomain,
    authorState => authorState.author,
  );

export {
  selectEditAuthorDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorData,
};
