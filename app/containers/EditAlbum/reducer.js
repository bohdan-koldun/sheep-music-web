import produce from 'immer';
import {
  LOAD_ALBUM,
  LOAD_ALBUM_SUCCESS,
  LOAD_ALBUM_ERROR,
  EDIT_ALBUM,
  EDIT_ALBUM_SUCCESS,
  EDIT_ALBUM_ERROR,
  LOAD_AUTHOR_IDS,
  LOAD_AUTHOR_IDS_ERROR,
  LOAD_AUTHOR_IDS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  authors: [],
  error: false,
  album: {},
};

/* eslint-disable default-case, no-param-reassign */
const editAlbumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ALBUM:
      case LOAD_AUTHOR_IDS:
      case EDIT_ALBUM:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_ALBUM_SUCCESS:
      case EDIT_ALBUM_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.album = action.album;
        break;
      case LOAD_AUTHOR_IDS_SUCCESS:
        draft.authors = action.authors;
        break;
      case LOAD_ALBUM_ERROR:
      case EDIT_ALBUM_ERROR:
      case LOAD_AUTHOR_IDS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default editAlbumReducer;
