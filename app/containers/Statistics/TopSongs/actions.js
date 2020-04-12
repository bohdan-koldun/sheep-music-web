import {
  LOAD_TOP_SONGS,
  LOAD_TOP_SONGS_ERROR,
  LOAD_TOP_SONGS_SUCCESS,
} from './constants';

export function loadTopSongs(days, count) {
  return {
    type: LOAD_TOP_SONGS,
    days,
    count,
  };
}

export function topSongsLoaded(data) {
  return {
    type: LOAD_TOP_SONGS_SUCCESS,
    data,
  };
}

export function topSongsLoadingError(error) {
  return {
    type: LOAD_TOP_SONGS_ERROR,
    error,
  };
}
