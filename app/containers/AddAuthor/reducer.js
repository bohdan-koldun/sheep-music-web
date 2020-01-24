import produce from 'immer';
import {
  ADD_AUTHOR,
  ADD_AUTHOR_ERROR,
  ADD_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_STORE,
  CLEAR_AUTHOR_STORE,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  author: {},
  result: null,
};

/* eslint-disable default-case, no-param-reassign */
const addAuthorReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_AUTHOR:
        draft.loading = true;
        draft.error = false;
        draft.result = null;
        break;
      case ADD_AUTHOR_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.author = {};
        draft.result = action.author;
        break;
      case UPDATE_AUTHOR_STORE:
        draft.author = action.author;
        break;
      case CLEAR_AUTHOR_STORE:
        draft.result = null;
        draft.error = false;
        draft.author = {};
        break;
      case ADD_AUTHOR_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default addAuthorReducer;
