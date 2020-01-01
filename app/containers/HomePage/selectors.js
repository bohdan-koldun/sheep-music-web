import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectStatisticHomeDomain = state => state.statisticHome || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectStatisticHomeDomain,
    homePageState => homePageState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectStatisticHomeDomain,
    homePageState => homePageState.error,
  );

const makeSelectStatisticData = () =>
  createSelector(
    selectStatisticHomeDomain,
    homePageState => homePageState.data,
  );

export {
  selectStatisticHomeDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectStatisticData,
};
