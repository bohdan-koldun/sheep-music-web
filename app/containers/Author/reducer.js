import produce from 'immer';
import {
  LOAD_AUTHOR,
  LOAD_AUTHOR_SUCCESS,
  LOAD_AUTHOR_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  authorData: {
    title: '',
    description: '',
    thumbnail: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const authorReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_AUTHOR:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_AUTHOR_SUCCESS:
        draft.authorData = action.author;
        draft.loading = false;
        break;

      case LOAD_AUTHOR_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default authorReducer;
