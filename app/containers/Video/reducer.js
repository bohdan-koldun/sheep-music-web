import produce from 'immer';
import { LOAD_VIDEO, LOAD_VIDEO_SUCCESS, LOAD_VIDEO_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  videoData: {
    title: '',
    description: '',
    thumbnail: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const videoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_VIDEO:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_VIDEO_SUCCESS:
        draft.videoData = action.video;
        draft.loading = false;
        break;

      case LOAD_VIDEO_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default videoReducer;
