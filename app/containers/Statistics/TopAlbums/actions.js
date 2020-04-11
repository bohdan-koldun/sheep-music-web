import {
  LOAD_TOP_ALBUMS,
  LOAD_TOP_ALBUMS_ERROR,
  LOAD_TOP_ALBUMS_SUCCESS,
} from './constants';

export function loadTopAlbums(days, count) {
  return {
    type: LOAD_TOP_ALBUMS,
    days,
    count,
  };
}

export function topAlbumsLoaded(data) {
  return {
    type: LOAD_TOP_ALBUMS_SUCCESS,
    data,
  };
}

export function topAlbumsLoadingError(error) {
  return {
    type: LOAD_TOP_ALBUMS_ERROR,
    error,
  };
}
