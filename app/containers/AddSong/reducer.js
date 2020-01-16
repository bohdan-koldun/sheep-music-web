import produce from 'immer';
import { ADD_SONG, ADD_SONG_ERROR, ADD_SONG_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
  song: {},
  result: null,
};

/* eslint-disable default-case, no-param-reassign */
const addSongReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_SONG:
        draft.loading = true;
        draft.error = false;
        draft.result = null;
        break;
      case ADD_SONG_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.song = {};
        draft.result = action.song;
        break;
      case ADD_SONG_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default addSongReducer;
