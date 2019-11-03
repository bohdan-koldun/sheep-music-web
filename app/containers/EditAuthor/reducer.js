import produce from 'immer';
import {
  LOAD_AUTHOR,
  LOAD_AUTHOR_SUCCESS,
  LOAD_AUTHOR_ERROR,
  EDIT_AUTHOR,
  EDIT_AUTHOR_SUCCESS,
  EDIT_AUTHOR_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  author: {},
};

/* eslint-disable default-case, no-param-reassign */
const editAuthorReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_AUTHOR:
      case EDIT_AUTHOR:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_AUTHOR_SUCCESS:
      case EDIT_AUTHOR_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.author = action.author;
        break;
      case LOAD_AUTHOR_ERROR:
      case EDIT_AUTHOR_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default editAuthorReducer;
