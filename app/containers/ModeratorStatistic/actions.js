import {
  LOAD_MODERATOR_STATISTIC,
  LOAD_MODERATOR_STATISTIC_SUCCESS,
  LOAD_MODERATOR_STATISTIC_ERROR,
} from './constants';

export function loadModeratorStatistic() {
  return {
    type: LOAD_MODERATOR_STATISTIC,
  };
}

export function loadModeratorStatisticSuccess(statistic) {
  return {
    type: LOAD_MODERATOR_STATISTIC_SUCCESS,
    statistic,
  };
}

export function loadModeratorStatisticError(error) {
  return {
    type: LOAD_MODERATOR_STATISTIC_ERROR,
    error,
  };
}
