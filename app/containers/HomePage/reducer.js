import produce from 'immer';
import {
  LOAD_STATISTIC,
  LOAD_STATISTIC_ERROR,
  LOAD_STATISTIC_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: {
    songs: [],
    albums: [],
    authors: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const statisticHomeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_STATISTIC:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_STATISTIC_SUCCESS:
        draft.data = action.data;
        draft.error = false;
        draft.loading = false;
        break;

      case LOAD_STATISTIC_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default statisticHomeReducer;
