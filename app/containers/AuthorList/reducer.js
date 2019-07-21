import produce from 'immer';
import {
  LOAD_AUTHOR_LIST,
  LOAD_AUTHOR_LIST_SUCCESS,
  LOAD_AUTHOR_LIST_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  authors: {},
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
    }
  });

export default authorListReducer;
