import produce from 'immer';
import {
  LOAD_MODERATOR_STATISTIC,
  LOAD_MODERATOR_STATISTIC_SUCCESS,
  LOAD_MODERATOR_STATISTIC_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  statistic: null,
};

/* eslint-disable default-case, no-param-reassign */
const moderatorStatisticReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MODERATOR_STATISTIC:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_MODERATOR_STATISTIC_SUCCESS:
        draft.statistic = action.statistic;
        draft.loading = false;
        draft.error = false;
        break;

      case LOAD_MODERATOR_STATISTIC_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default moderatorStatisticReducer;
