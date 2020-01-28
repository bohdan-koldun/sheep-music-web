/* eslint-disable no-restricted-syntax */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import {
  songLoaded,
  songLoadingError,
  addSongFilesError,
  addSongFilesSuccess,
} from './actions';
import { LOAD_SONG, ADD_SONG_FILES } from './constants';

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
  const requestURL = `${API_HOST}/songs/audio/${action.id}`;
  const { song } = action;

  const formData = new FormData();

  for (const name of Object.keys(song)) {
    formData.append(name, song[name]);
  }

  try {
    const token = localStorage.getItem('authToken');

    const result = yield call(request, requestURL, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: formData,
    });
    yield put(addSongFilesSuccess(result));
  } catch (err) {
    yield put(addSongFilesError(err));
  }
}

export default function* editSongSaga() {
  yield takeLatest(LOAD_SONG, getSong);
  yield takeLatest(ADD_SONG_FILES, editSong);
}
