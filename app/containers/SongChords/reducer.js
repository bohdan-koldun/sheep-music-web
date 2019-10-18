import produce from 'immer';
import {
  LOAD_SONG_CHORDS,
  LOAD_SONG_CHORDS_SUCCESS,
  LOAD_SONG_CHORDS_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  songData: {
    title: '',
    audioMp3: {},
    chords: '',
    chordKey: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const songReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SONG_CHORDS:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_SONG_CHORDS_SUCCESS:
        draft.songData = action.song;
        draft.error = false;
        draft.loading = false;
        break;

      case LOAD_SONG_CHORDS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default songReducer;
