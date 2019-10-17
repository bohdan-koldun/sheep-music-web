import {
  LOAD_SONG,
  LOAD_SONG_SUCCESS,
  LOAD_SONG_ERROR,
  EDIT_SONG,
  EDIT_SONG_SUCCESS,
  EDIT_SONG_ERROR,
} from './constants';

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

export function editSong(song) {
  return {
    type: EDIT_SONG,
    song,
  };
}

export function editSuccess(song) {
  return {
    type: EDIT_SONG_SUCCESS,
    song,
  };
}

export function editError(error) {
  return {
    type: EDIT_SONG_ERROR,
    error,
  };
}
