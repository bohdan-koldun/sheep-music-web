import produce from 'immer';
import {
  LOAD_ALBUM_LIST,
  LOAD_ALBUM_LIST_SUCCESS,
  LOAD_ALBUM_LIST_ERROR,
  CHANGE_ALBUM_LIST_PAGE,
  CHANGE_ALBUM_LIST_FILTER,
  CHANGE_ALBUM_LIST_SEARCH,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  albums: {},
  page: 0,
  search: '',
  filter: {
    value: 'newest',
    label: 'Новые',
  },
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
      case CHANGE_ALBUM_LIST_SEARCH:
        draft.search = action.search;
        draft.page = 0;
        break;
      case CHANGE_ALBUM_LIST_PAGE:
        draft.page = action.page;
        break;
      case CHANGE_ALBUM_LIST_FILTER:
        draft.filter = action.filter;
        break;
    }
  });

export default albumListReducer;
