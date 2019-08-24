import produce from 'immer';
import {
  LOAD_AUTHOR_LIST,
  LOAD_AUTHOR_LIST_SUCCESS,
  LOAD_AUTHOR_LIST_ERROR,
  CHANGE_AUTHOR_LIST_PAGE,
  CHANGE_AUTHOR_LIST_FILTER,
  CHANGE_AUTHOR_LIST_SEARCH,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  authors: {},
  page: 0,
  search: '',
  filter: {
    value: 'newest',
    label: 'Новые',
  },
};

/* eslint-disable default-case, no-param-reassign */
const authorListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_AUTHOR_LIST:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_AUTHOR_LIST_SUCCESS:
        draft.loading = false;
        draft.authors = action.authorList;
        break;
      case LOAD_AUTHOR_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CHANGE_AUTHOR_LIST_SEARCH:
        draft.search = action.search;
        break;
      case CHANGE_AUTHOR_LIST_PAGE:
        draft.page = action.page;
        break;
      case CHANGE_AUTHOR_LIST_FILTER:
        draft.filter = action.filter;
        break;
    }
  });

export default authorListReducer;
