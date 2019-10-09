import produce from 'immer';
import { LOAD_TAGS_SUCCESS, LOAD_TAGS, LOAD_TAGS_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  tags: [],
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
    }
  });

export default appReducer;
