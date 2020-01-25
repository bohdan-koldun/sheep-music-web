import produce from 'immer';
import {
  ADD_ALBUM,
  ADD_ALBUM_ERROR,
  ADD_ALBUM_SUCCESS,
  UPDATE_ALBUM_STORE,
  CLEAR_ALBUM_STORE,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  album: {},
  result: null,
};

/* eslint-disable default-case, no-param-reassign */
const addAlbumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_ALBUM:
        draft.loading = true;
        draft.error = false;
        draft.result = null;
        break;
      case ADD_ALBUM_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.album = {};
        draft.result = action.album;
        break;
      case UPDATE_ALBUM_STORE:
        draft.album = action.album;
        break;
      case CLEAR_ALBUM_STORE:
        draft.result = null;
        draft.error = false;
        draft.album = {};
        break;
      case ADD_ALBUM_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default addAlbumReducer;
