import produce from 'immer';
import {
  LOAD_TOP_ALBUMS,
  LOAD_TOP_ALBUMS_ERROR,
  LOAD_TOP_ALBUMS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  albums: null,
};

/* eslint-disable default-case, no-param-reassign */
const topAlbumsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TOP_ALBUMS:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_TOP_ALBUMS_SUCCESS:
        draft.albums = action.data;
        draft.error = false;
        draft.loading = false;
        break;

      case LOAD_TOP_ALBUMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default topAlbumsReducer;
