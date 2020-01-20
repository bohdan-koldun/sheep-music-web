import produce from 'immer';
import {
  LOAD_AUTHOR_IDS,
  LOAD_AUTHOR_IDS_ERROR,
  LOAD_AUTHOR_IDS_SUCCESS,
  LOAD_ALBUM_IDS,
  LOAD_ALBUM_IDS_ERROR,
  LOAD_ALBUM_IDS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  albums: [],
  authors: [],
};

/* eslint-disable default-case, no-param-reassign */
const formReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_AUTHOR_IDS:
      case LOAD_ALBUM_IDS:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_AUTHOR_IDS_SUCCESS:
        draft.authors = action.authors;
        draft.loading = false;
        break;
      case LOAD_ALBUM_IDS_SUCCESS:
        draft.albums =
          action.albums && action.albums.length ? action.albums : [{}];
        draft.loading = false;
        break;

      case LOAD_AUTHOR_IDS_ERROR:
      case LOAD_ALBUM_IDS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default formReducer;
