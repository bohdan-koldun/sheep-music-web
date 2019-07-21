import produce from 'immer';
import {
  LOAD_ALBUM_LIST,
  LOAD_ALBUM_LIST_SUCCESS,
  LOAD_ALBUM_LIST_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  albums: {},
};

/* eslint-disable default-case, no-param-reassign */
const albumListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ALBUM_LIST:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_ALBUM_LIST_SUCCESS:
        draft.loading = false;
        draft.albums = action.albumList;
        break;
      case LOAD_ALBUM_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default albumListReducer;
