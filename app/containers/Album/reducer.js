import produce from 'immer';
import { LOAD_ALBUM, LOAD_ALBUM_SUCCESS, LOAD_ALBUM_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  albumData: {
    title: '',
    description: '',
    year: '',
    iTunes: '',
    googlePlay: '',
    author: {},
    thumbnail: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const albumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ALBUM:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_ALBUM_SUCCESS:
        draft.albumData = action.album;
        draft.loading = false;
        break;

      case LOAD_ALBUM_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default albumReducer;
