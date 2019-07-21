import {
  LOAD_AUTHOR_LIST,
  LOAD_AUTHOR_LIST_SUCCESS,
  LOAD_AUTHOR_LIST_ERROR,
} from './constants';

export function loadAuthorList(page) {
  return {
    type: LOAD_AUTHOR_LIST,
    page,
  };
}

export function authorListLoaded(authorList) {
  return {
    type: LOAD_AUTHOR_LIST_SUCCESS,
    authorList,
  };
}

export function authorListLoadingError(error) {
  return {
    type: LOAD_AUTHOR_LIST_ERROR,
    error,
  };
}
