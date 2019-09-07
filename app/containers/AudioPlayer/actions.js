import {
  SET_PLAY_SONG,
  SET_PLAY_SONG_LIST,
  SET_PLAY_BY_LIST_ID,
  SET_PLAY_PAUSE,
  SET_SHOW_PLAYER_LIST,
} from './constants';

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

export function setPlayByListId(listId) {
  return {
    type: SET_PLAY_BY_LIST_ID,
    listId,
  };
}

export function setPlayPause() {
  return {
    type: SET_PLAY_PAUSE,
  };
}

export function setShowPlayList() {
  return {
    type: SET_SHOW_PLAYER_LIST,
  };
}
