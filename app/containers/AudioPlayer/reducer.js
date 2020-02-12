import produce from 'immer';
import {
  SET_PLAY_SONG,
  SET_PLAY_SONG_LIST,
  SET_PLAY_PAUSE,
  SET_PLAY_BY_LIST_ID,
  SET_SHOW_PLAYER_LIST,
  MIX_PLAYER_LIST,
} from './constants';

export const initialState = {
  play: false,
  showPlayer: false,
  showPlayerList: false,
  playData: {
    song: {
      id: null,
      playMinus: false,
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
          song: { ...(action.song || {}), playMinus: action.playMinus },
          nextPlayListId: state.playData && state.playData.audioMp3 && 1,
        };
        draft.playList = [action.song, ...draft.playList];
        draft.isMinus = !!action.isMinus;
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
      case SET_PLAY_PAUSE: {
        const { playMinus } = action;
        const { play } = draft;
        const prevState = draft.playData.song || {};

        draft.play = (play && playMinus !== prevState.playMinus) || !play;
        draft.showPlayer = true;
        draft.playData = {
          ...state.playData,
          song: {
            ...(state.playData.song || {}),
            playMinus: !!playMinus,
          },
        };
        break;
      }
      case SET_PLAY_BY_LIST_ID: {
        const currSong = state.playData.song;
        const newSong = state.playList[action.listId];

        draft.showPlayer = true;
        draft.play =
          !currSong || !newSong || currSong.id !== newSong.id
            ? true
            : !state.play;
        draft.playData = {
          prevPlayListId:
            action.listId > 0 && action.listId < state.playList.length
              ? action.listId - 1
              : null,
          song: { ...newSong },
          nextPlayListId:
            action.listId >= 0 && action.listId < state.playList.length - 1
              ? action.listId + 1
              : null,
        };
        break;
      }
      case SET_SHOW_PLAYER_LIST:
        draft.showPlayerList = !state.showPlayerList;
        break;
      case MIX_PLAYER_LIST: {
        const mixedPlayList = [...state.playList].sort(
          () => Math.random() - 0.5,
        );
        const curSongIndex = mixedPlayList.findIndex(
          song => state.playData.song && song.id === state.playData.song.id,
        );
        draft.playData = {
          ...state.playData,
          prevPlayListId:
            curSongIndex > 0 && curSongIndex < mixedPlayList.length
              ? curSongIndex - 1
              : null,
          nextPlayListId:
            curSongIndex >= 0 && curSongIndex < mixedPlayList.length - 1
              ? curSongIndex + 1
              : null,
        };
        draft.playList = mixedPlayList;
        break;
      }
    }
  });

export default audioPlayerReducer;
