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

const makeSelectAuthorListPage = () =>
  createSelector(
    selectAuthorListDomain,
    songState => songState.page,
  );

const makeSelectAuthorListSearch = () =>
  createSelector(
    selectAuthorListDomain,
    songState => songState.search,
  );

const makeSelectAuthorListFilter = () =>
  createSelector(
    selectAuthorListDomain,
    songState => songState.filter,
  );

export {
  selectAuthorListDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorList,
  makeSelectAuthorListPage,
  makeSelectAuthorListSearch,
  makeSelectAuthorListFilter,
};
