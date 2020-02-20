import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectModeratorStatisticReducerDomain = state =>
  state.moderatorStatistic || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectModeratorStatisticReducerDomain,
    moderatorStatistic => moderatorStatistic.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectModeratorStatisticReducerDomain,
    moderatorStatistic => moderatorStatistic.error,
  );

const makeSelectModeratorStatistic = () =>
  createSelector(
    selectModeratorStatisticReducerDomain,
    moderatorStatistic => moderatorStatistic.statistic,
  );

export {
  selectModeratorStatisticReducerDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectModeratorStatistic,
};
