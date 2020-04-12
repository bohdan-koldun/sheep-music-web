import produce from 'immer';
import {
  LOAD_TOP_SONGS,
  LOAD_TOP_SONGS_ERROR,
  LOAD_TOP_SONGS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  songs: null,
};

/* eslint-disable default-case, no-param-reassign */
const topSongsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TOP_SONGS:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_TOP_SONGS_SUCCESS:
        draft.songs = action.data;
        draft.error = false;
        draft.loading = false;
        break;

      case LOAD_TOP_SONGS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default topSongsReducer;
