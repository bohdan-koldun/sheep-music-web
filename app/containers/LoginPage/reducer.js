import produce from 'immer';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.loading = true;
        draft.error = false;
        break;

      case LOGIN_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        break;

      case LOGIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default loginPageReducer;
