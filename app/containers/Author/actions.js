import {
  LOAD_AUTHOR,
  LOAD_AUTHOR_SUCCESS,
  LOAD_AUTHOR_ERROR,
} from './constants';

export function loadAuthor(slug) {
  return {
    type: LOAD_AUTHOR,
    slug,
  };
}

export function authorLoaded(author) {
  return {
    type: LOAD_AUTHOR_SUCCESS,
    author,
  };
}

export function authorLoadingError(error) {
  return {
    type: LOAD_AUTHOR_ERROR,
    error,
  };
}
