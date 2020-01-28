import {
  LOAD_SONG,
  LOAD_SONG_SUCCESS,
  LOAD_SONG_ERROR,
  ADD_SONG_FILES,
  ADD_SONG_FILES_SUCCESS,
  ADD_SONG_FILES_ERROR,
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

export function addSongFiles(song, id) {
  return {
    type: ADD_SONG_FILES,
    song,
    id,
  };
}

export function addSongFilesSuccess(song) {
  return {
    type: ADD_SONG_FILES_SUCCESS,
    song,
  };
}

export function addSongFilesError(error) {
  return {
    type: ADD_SONG_FILES_ERROR,
    error,
  };
}
