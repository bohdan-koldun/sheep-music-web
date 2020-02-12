import {
  SET_PLAY_SONG,
  SET_PLAY_SONG_LIST,
  SET_PLAY_BY_LIST_ID,
  SET_PLAY_PAUSE,
  SET_SHOW_PLAYER_LIST,
  MIX_PLAYER_LIST,
} from './constants';

export function setSong(song, playMinus = false) {
  return {
    type: SET_PLAY_SONG,
    song,
    playMinus,
  };
}

export function setSongList(song, songList) {
  return {
    type: SET_PLAY_SONG_LIST,
    song,
    songList,
  };
}

export function setPlayByListId(listId) {
  return {
    type: SET_PLAY_BY_LIST_ID,
    listId,
  };
}

export function setPlayPause(playMinus = false) {
  return {
    type: SET_PLAY_PAUSE,
    playMinus,
  };
}

export function setShowPlayList() {
  return {
    type: SET_SHOW_PLAYER_LIST,
  };
}

export function mixPlayList() {
  return {
    type: MIX_PLAYER_LIST,
  };
}
