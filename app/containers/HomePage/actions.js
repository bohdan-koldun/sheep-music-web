import {
  LOAD_STATISTIC,
  LOAD_STATISTIC_ERROR,
  LOAD_STATISTIC_SUCCESS,
} from './constants';

export function loadStatistic() {
  return {
    type: LOAD_STATISTIC,
  };
}

export function statisticLoaded(data) {
  return {
    type: LOAD_STATISTIC_SUCCESS,
    data,
  };
}

export function statisticLoadingError(error) {
  return {
    type: LOAD_STATISTIC_ERROR,
    error,
  };
}
