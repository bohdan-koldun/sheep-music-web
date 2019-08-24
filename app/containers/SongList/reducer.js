import produce from 'immer';
import {
  LOAD_SONG_LIST,
  LOAD_SONG_LIST_SUCCESS,
  LOAD_SONG_LIST_ERROR,
  CHANGE_SONG_LIST_PAGE,
  CHANGE_SONG_LIST_SEARCH,
  CHANGE_SONG_LIST_FILTER,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  songs: {},
  page: 0,
  search: '',
  filter: {
    value: 'newest',
    label: 'Новые',
  },
};

/* eslint-disable default-case, no-param-reassign */
const songListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SONG_LIST:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_SONG_LIST_SUCCESS:
        draft.loading = false;
        draft.songs = action.songList;
        break;
      case LOAD_SONG_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.search = '';
        draft.filter = '';
        break;
      case CHANGE_SONG_LIST_SEARCH:
        draft.search = action.search;
        break;
      case CHANGE_SONG_LIST_PAGE:
        draft.page = action.page;
        break;
      case CHANGE_SONG_LIST_FILTER:
        draft.filter = action.filter;
        break;
    }
  });

export default songListReducer;
