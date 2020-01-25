/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import {
  albumLoaded,
  albumLoadingError,
  editError,
  editSuccess,
  authorIdsLoaded,
  authorIdsLoadingError,
} from './actions';
import { LOAD_ALBUM, EDIT_ALBUM, LOAD_AUTHOR_IDS } from './constants';

export function* getAuthors() {
  const requestURL = `${API_HOST}/authors/list/id`;

  try {
    const authors = yield call(request, requestURL);
    yield put(authorIdsLoaded(authors));
  } catch (err) {
    yield put(authorIdsLoadingError(err));
  }
}

export function* getAlbum(action) {
  const requestURL = `${API_HOST}/albums/${action.slug}`;

  try {
    const album = yield call(request, requestURL);
    yield put(albumLoaded(album));
  } catch (err) {
    yield put(albumLoadingError(err));
  }
}

export function* editAlbum(action) {
  const requestURL = `${API_HOST}/albums`;
  if (action.album && !action.album.avatar) {
    delete action.album.avatar;
  }
  const formData = new FormData();
  for (const name of Object.keys(action.album)) {
    formData.append(name, action.album[name]);
  }
  try {
    const token = localStorage.getItem('authToken');
    const album = yield call(request, requestURL, {
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
    yield put(editSuccess(album));
  } catch (err) {
    yield put(editError(err && err.response));
  }
}

export default function* editAlbumSaga() {
  yield takeLatest(LOAD_ALBUM, getAlbum);
  yield takeLatest(EDIT_ALBUM, editAlbum);
  yield takeLatest(LOAD_AUTHOR_IDS, getAuthors);
}
