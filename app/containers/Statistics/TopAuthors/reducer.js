import produce from 'immer';
import {
  LOAD_TOP_AUTHOR,
  LOAD_TOP_AUTHOR_ERROR,
  LOAD_TOP_AUTHOR_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  authors: null,
};

/* eslint-disable default-case, no-param-reassign */
const topAuthorsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TOP_AUTHOR:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_TOP_AUTHOR_SUCCESS:
        draft.authors = action.data;
        draft.error = false;
        draft.loading = false;
        break;

      case LOAD_TOP_AUTHOR_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default topAuthorsReducer;
