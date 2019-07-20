import { LOAD_SONG, LOAD_SONG_SUCCESS, LOAD_SONG_ERROR } from './constants';

export function loadSong(slug) {
  return {
    type: LOAD_SONG,
    slug,
  };
}

export function songLoaded(song) {
  return {
    type: LOAD_SONG_SUCCESS,
    song,
  };
}

export function songLoadingError(error) {
  return {
    type: LOAD_SONG_ERROR,
    error,
  };
}
