import produce from 'immer';
import {
  SET_PLAY_SONG,
  SET_PLAY_SONG_LIST,
  SET_PLAY_PAUSE,
  SET_PLAY_BY_LIST_ID,
} from './constants';

export const initialState = {
  play: false,
  showPlayer: false,
  playData: {
    song: {
      id: null,
    },
    prevPlayListId: null,
    nextPlayListId: null,
  },
  playList: [],
};

/* eslint-disable default-case, no-param-reassign */
const audioPlayerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PLAY_SONG:
        draft.play = true;
        draft.showPlayer = true;
        draft.playData = {
          prevPlayListId: null,
          song: action.song,
          nextPlayListId: state.playData && state.playData.audioMp3 && 1,
        };
        draft.playList = [action.song, ...draft.playList];
        break;

      case SET_PLAY_SONG_LIST: {
        const filteredList = action.songList
          ? action.songList.filter(song => song.audioMp3 && song.audioMp3.path)
          : [];
        const curSongIndex = filteredList.findIndex(
          song => action.song && song.id === action.song.id,
        );
        draft.play = true;
        draft.showPlayer = true;
        draft.playData = {
          prevPlayListId:
            curSongIndex > 0 && curSongIndex < filteredList.length
              ? curSongIndex - 1
              : null,
          song: action.song,
          nextPlayListId:
            curSongIndex >= 0 && curSongIndex < filteredList.length - 1
              ? curSongIndex + 1
              : null,
        };
        draft.playList = filteredList;
        break;
      }
      case SET_PLAY_PAUSE:
        draft.play = !draft.play;
        draft.showPlayer = true;
        break;
      case SET_PLAY_BY_LIST_ID:
        draft.showPlayer = true;
        draft.playData = {
          prevPlayListId:
            action.listId > 0 && action.listId < state.playList.length
              ? action.listId - 1
              : null,
          song: { ...state.playList[action.listId] },
          nextPlayListId:
            action.listId >= 0 && action.listId < state.playList.length - 1
              ? action.listId + 1
              : null,
        };
        break;
    }
  });

export default audioPlayerReducer;