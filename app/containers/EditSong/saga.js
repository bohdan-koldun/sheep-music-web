import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import {
  songLoaded,
  songLoadingError,
  editError,
  editSuccess,
} from './actions';
import { LOAD_SONG, EDIT_SONG } from './constants';

export function* getSong(action) {
  const requestURL = `${API_HOST}/songs/${action.slug}`;

  try {
    const song = yield call(request, requestURL);
    yield put(songLoaded(song));
  } catch (err) {
    yield put(songLoadingError(err));
  }
}

export function* editSong(action) {
  const requestURL = `${API_HOST}/songs`;
  try {
    const token = localStorage.getItem('authToken');
    const song = yield call(request, requestURL, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(action.song),
    });
    yield put(editSuccess(song));
  } catch (err) {
    yield put(editError(err));
  }
}

export default function* editSongSaga() {
  yield takeLatest(LOAD_SONG, getSong);
  yield takeLatest(EDIT_SONG, editSong);
}
