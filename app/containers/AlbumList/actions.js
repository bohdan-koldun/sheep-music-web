import {
  LOAD_ALBUM_LIST,
  LOAD_ALBUM_LIST_SUCCESS,
  LOAD_ALBUM_LIST_ERROR,
  CHANGE_ALBUM_LIST_PAGE,
  CHANGE_ALBUM_LIST_FILTER,
  CHANGE_ALBUM_LIST_SEARCH,
} from './constants';

export function loadAlbumList(page, search, filter) {
  return {
    type: LOAD_ALBUM_LIST,
    page,
    search,
    filter,
  };
}

export function albumListLoaded(albumList) {
  return {
    type: LOAD_ALBUM_LIST_SUCCESS,
    albumList,
  };
}

export function albumListLoadingError(error) {
  return {
    type: LOAD_ALBUM_LIST_ERROR,
    error,
  };
}

export function changeSearch(search) {
  return {
    type: CHANGE_ALBUM_LIST_SEARCH,
    search,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_ALBUM_LIST_PAGE,
    page,
  };
}

export function changeFilter(filter) {
  return {
    type: CHANGE_ALBUM_LIST_FILTER,
    filter,
  };
}
