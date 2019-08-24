import {
  LOAD_AUTHOR_LIST,
  LOAD_AUTHOR_LIST_SUCCESS,
  LOAD_AUTHOR_LIST_ERROR,
  CHANGE_AUTHOR_LIST_PAGE,
  CHANGE_AUTHOR_LIST_FILTER,
  CHANGE_AUTHOR_LIST_SEARCH,
} from './constants';

export function loadAuthorList(page, search, filter) {
  return {
    type: LOAD_AUTHOR_LIST,
    page,
    search,
    filter,
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

export function changeSearch(search) {
  return {
    type: CHANGE_AUTHOR_LIST_SEARCH,
    search,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_AUTHOR_LIST_PAGE,
    page,
  };
}

export function changeFilter(filter) {
  return {
    type: CHANGE_AUTHOR_LIST_FILTER,
    filter,
  };
}
