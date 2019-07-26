import { SET_PLAY_SONG, SET_PLAY_SONG_LIST, SET_PLAY_PAUSE } from './constants';

export function setSong(song) {
  return {
    type: SET_PLAY_SONG,
    song,
  };
}

export function setSongList(song, songList) {
  return {
    type: SET_PLAY_SONG_LIST,
    song,
    songList,
  };
}

export function setPlayPause(sondId) {
  return {
    type: SET_PLAY_PAUSE,
    sondId,
  };
}
