import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuthorListDomain = state => state.authorList || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectAuthorListDomain,
    authorState => authorState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAuthorListDomain,
    authorState => authorState.error,
  );

const makeSelectAuthorList = () =>
  createSelector(
    selectAuthorListDomain,
    authorState => authorState.authors,
  );

export {
  selectAuthorListDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorList,
};
