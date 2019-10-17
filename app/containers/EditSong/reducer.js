import produce from 'immer';
import {
  LOAD_SONG,
  LOAD_SONG_SUCCESS,
  LOAD_SONG_ERROR,
  EDIT_SONG,
  EDIT_SONG_SUCCESS,
  EDIT_SONG_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  song: {},
};

/* eslint-disable default-case, no-param-reassign */
const editSongReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SONG:
      case EDIT_SONG:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_SONG_SUCCESS:
      case EDIT_SONG_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.song = action.song;
        break;
      case LOAD_SONG_ERROR:
      case EDIT_SONG_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default editSongReducer;
