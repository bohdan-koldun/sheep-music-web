import {
  LOAD_ALBUM_LIST,
  LOAD_ALBUM_LIST_SUCCESS,
  LOAD_ALBUM_LIST_ERROR,
} from './constants';

export function loadAlbumList(page) {
  return {
    type: LOAD_ALBUM_LIST,
    page,
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
