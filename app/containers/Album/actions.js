import { LOAD_ALBUM, LOAD_ALBUM_SUCCESS, LOAD_ALBUM_ERROR } from './constants';

export function loadAlbum(slug) {
  return {
    type: LOAD_ALBUM,
    slug,
  };
}

export function albumLoaded(album) {
  return {
    type: LOAD_ALBUM_SUCCESS,
    album,
  };
}

export function albumLoadingError(error) {
  return {
    type: LOAD_ALBUM_ERROR,
    error,
  };
}
