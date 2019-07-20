/*
 *
 * SongList reducer
 *
 */
import produce from 'immer';
import {
  LOAD_SONG_LIST,
  LOAD_SONG_LIST_SUCCESS,
  LOAD_SONG_LIST_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  songs: {},
};

/* eslint-disable default-case, no-param-reassign */
const songListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SONG_LIST:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_SONG_LIST_SUCCESS:
        draft.loading = false;
        draft.songs = action.songList;
        break;
      case LOAD_SONG_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default songListReducer;
