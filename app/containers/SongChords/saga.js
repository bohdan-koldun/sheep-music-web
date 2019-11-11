import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_SONG_CHORDS } from 'containers/SongChords/constants';
import {
  songChordsLoaded,
  songChordsLoadingError,
} from 'containers/SongChords/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import viewCounter from 'utils/viewCounter';

export function* getSongChords(action) {
  const requestURL = `${API_HOST}/songs/${action.slug}`;

  try {
    const song = yield call(request, requestURL);
    yield put(songChordsLoaded(song));
    viewCounter('song', song && song.id);
  } catch (err) {
    yield put(songChordsLoadingError(err));
  }
}

export default function* songChordsSaga() {
  yield takeLatest(LOAD_SONG_CHORDS, getSongChords);
}
