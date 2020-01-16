import { ADD_SONG, ADD_SONG_SUCCESS, ADD_SONG_ERROR } from './constants';

export function addSong(song) {
  return {
    type: ADD_SONG,
    song,
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
