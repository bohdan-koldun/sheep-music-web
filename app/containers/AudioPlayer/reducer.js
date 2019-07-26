import produce from 'immer';
import { SET_PLAY_SONG, SET_PLAY_SONG_LIST, SET_PLAY_PAUSE } from './constants';

export const initialState = {
  play: false,
  showPlayer: true,
  playSong: {},
  playList: [],
};

/* eslint-disable default-case, no-param-reassign */
const audioPlayerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PLAY_SONG:
        draft.play = true;
        draft.showPlayer = true;
        draft.playSong = action.song;
        draft.playList = [action.song, ...draft.playList];
        break;

      case SET_PLAY_SONG_LIST:
        draft.play = true;
        draft.showPlayer = true;
        draft.playSong = action.song;
        draft.playList = action.songList;
        break;

      case SET_PLAY_PAUSE:
        draft.play = !draft.play;
        draft.showPlayer = true;
        draft.playSong = {
          ...state.playList.filter(item => action.sondId === item.id)[0],
        };
        break;
    }
  });

export default audioPlayerReducer;
