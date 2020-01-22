import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import { addSongError, addSongSuccess } from './actions';
import { ADD_SONG } from './constants';

export function* addSong(action) {
  const requestURL = `${API_HOST}/songs`;
  try {
    const token = localStorage.getItem('authToken');
    const song = yield call(request, requestURL, {
      method: 'POST',
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
    yield put(addSongSuccess(song));
  } catch (err) {
    yield put(addSongError(err && err.response));
  }
}

export default function* addSongSaga() {
  yield takeLatest(ADD_SONG, addSong);
}
