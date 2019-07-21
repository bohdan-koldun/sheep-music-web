import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuthorDomain = state => state.author || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectAuthorDomain,
    authorState => authorState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAuthorDomain,
    authorState => authorState.error,
  );

const makeSelectAuthorData = () =>
  createSelector(
    selectAuthorDomain,
    authorState => authorState.authorData,
  );

export {
  selectAuthorDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorData,
};
