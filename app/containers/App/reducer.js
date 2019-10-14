import produce from 'immer';
import {
  LOAD_TAGS_SUCCESS,
  LOAD_TAGS,
  LOAD_TAGS_ERROR,
  LOAD_USER,
  LOAD_USER_ERROR,
  LOAD_USER_SUCCESS,
  LOGOUT,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  tags: [],
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TAGS:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_TAGS_SUCCESS:
        draft.tags = action.tags;
        draft.loading = false;
        break;
      case LOAD_TAGS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOAD_USER:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_USER_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        break;
      case LOAD_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOGOUT:
        draft.user = null;
        break;
    }
  });

export default appReducer;
