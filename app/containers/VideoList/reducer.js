import produce from 'immer';
import {
  LOAD_VIDEO_LIST,
  LOAD_VIDEO_LIST_SUCCESS,
  LOAD_VIDEO_LIST_ERROR,
  CHANGE_VIDEO_LIST_PAGE,
  CHANGE_VIDEO_LIST_FILTER,
  CHANGE_VIDEO_LIST_SEARCH,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  videos: {},
  page: 0,
  search: '',
  filter: {
    value: 'newest',
    label: 'Новые',
  },
};

/* eslint-disable default-case, no-param-reassign */
const videoListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_VIDEO_LIST:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_VIDEO_LIST_SUCCESS:
        draft.loading = false;
        draft.videos = action.videoList;
        break;
      case LOAD_VIDEO_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CHANGE_VIDEO_LIST_SEARCH:
        draft.search = action.search;
        draft.page = 0;
        break;
      case CHANGE_VIDEO_LIST_PAGE:
        draft.page = action.page;
        break;
      case CHANGE_VIDEO_LIST_FILTER:
        draft.filter = action.filter;
        break;
    }
  });

export default videoListReducer;
