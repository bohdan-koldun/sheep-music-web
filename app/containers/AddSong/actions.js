import {
  ADD_SONG,
  ADD_SONG_SUCCESS,
  ADD_SONG_ERROR,
  UPDATE_SONG_STORE,
  CLEAR_SONG_STORE,
} from './constants';

export function addSong(song) {
  return {
    type: ADD_SONG,
    song,
  };
}

export function updateSongStore(song) {
  return {
    type: UPDATE_SONG_STORE,
    song,
  };
}

export function clearSongStore() {
  return {
    type: CLEAR_SONG_STORE,
  };
}

export function addSongSuccess(song) {
  return {
    type: ADD_SONG_SUCCESS,
    song,
  };
}

export function addSongError(error) {
  return {
    type: ADD_SONG_ERROR,
    error,
  };
}
