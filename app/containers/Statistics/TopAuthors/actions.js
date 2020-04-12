import {
  LOAD_TOP_AUTHOR,
  LOAD_TOP_AUTHOR_ERROR,
  LOAD_TOP_AUTHOR_SUCCESS,
} from './constants';

export function loadTopAuthors(days, count) {
  return {
    type: LOAD_TOP_AUTHOR,
    days,
    count,
  };
}

export function topAuthorsLoaded(data) {
  return {
    type: LOAD_TOP_AUTHOR_SUCCESS,
    data,
  };
}

export function topAuthorsLoadingError(error) {
  return {
    type: LOAD_TOP_AUTHOR_ERROR,
    error,
  };
}
