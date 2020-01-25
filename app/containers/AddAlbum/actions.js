import {
  ADD_ALBUM,
  ADD_ALBUM_SUCCESS,
  ADD_ALBUM_ERROR,
  UPDATE_ALBUM_STORE,
  CLEAR_ALBUM_STORE,
} from './constants';

export function addAlbum(album) {
  return {
    type: ADD_ALBUM,
    album,
  };
}

export function updateAlbumStore(album) {
  return {
    type: UPDATE_ALBUM_STORE,
    album,
  };
}

export function clearAlbumStore() {
  return {
    type: CLEAR_ALBUM_STORE,
  };
}

export function addAlbumSuccess(album) {
  return {
    type: ADD_ALBUM_SUCCESS,
    album,
  };
}

export function addAlbumError(error) {
  return {
    type: ADD_ALBUM_ERROR,
    error,
  };
}
