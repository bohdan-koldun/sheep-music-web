import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectVideoListDomain = state => state.videoList || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectVideoListDomain,
    videoState => videoState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectVideoListDomain,
    videoState => videoState.error,
  );

const makeSelectVideoList = () =>
  createSelector(
    selectVideoListDomain,
    videoState => videoState.videos,
  );

const makeSelectVideoListPage = () =>
  createSelector(
    selectVideoListDomain,
    songState => songState.page,
  );

const makeSelectVideoListSearch = () =>
  createSelector(
    selectVideoListDomain,
    songState => songState.search,
  );

const makeSelectVideoListFilter = () =>
  createSelector(
    selectVideoListDomain,
    songState => songState.filter,
  );

export {
  selectVideoListDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectVideoList,
  makeSelectVideoListPage,
  makeSelectVideoListSearch,
  makeSelectVideoListFilter,
};
