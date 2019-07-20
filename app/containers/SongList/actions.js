import {
  LOAD_SONG_LIST,
  LOAD_SONG_LIST_SUCCESS,
  LOAD_SONG_LIST_ERROR,
} from './constants';

export function loadSongList(page) {
  return {
    type: LOAD_SONG_LIST,
    page,
  };
}

export function songListLoaded(songList) {
  return {
    type: LOAD_SONG_LIST_SUCCESS,
    songList,
  };
}

export function songListLoadingError(error) {
  return {
    type: LOAD_SONG_LIST_ERROR,
    error,
  };
}
