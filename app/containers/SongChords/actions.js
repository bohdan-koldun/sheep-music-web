import {
  LOAD_SONG_CHORDS,
  LOAD_SONG_CHORDS_SUCCESS,
  LOAD_SONG_CHORDS_ERROR,
} from './constants';

export function loadSongChords(slug) {
  return {
    type: LOAD_SONG_CHORDS,
    slug,
  };
}

export function songChordsLoaded(song) {
  return {
    type: LOAD_SONG_CHORDS_SUCCESS,
    song,
  };
}

export function songChordsLoadingError(error) {
  return {
    type: LOAD_SONG_CHORDS_ERROR,
    error,
  };
}
