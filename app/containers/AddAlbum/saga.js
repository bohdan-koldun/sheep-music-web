/* eslint-disable no-restricted-syntax */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import { addAlbumError, addAlbumSuccess } from './actions';
import { ADD_ALBUM } from './constants';

export function* addAlbum(action) {
  const requestURL = `${API_HOST}/albums`;
  const { album } = action;

  if (album && !album.avatar) {
    delete album.avatar;
  }

  const formData = new FormData();

  for (const name of Object.keys(album)) {
    formData.append(name, album[name]);
  }

  try {
    const token = localStorage.getItem('authToken');

    const result = yield call(request, requestURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: formData,
    });
    yield put(addAlbumSuccess(result));
  } catch (err) {
    yield put(addAlbumError(err && err.response));
  }
}

export default function* addAlbumSaga() {
  yield takeLatest(ADD_ALBUM, addAlbum);
}
