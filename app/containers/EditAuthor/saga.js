/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import {
  authorLoaded,
  authorLoadingError,
  editError,
  editSuccess,
} from './actions';
import { LOAD_AUTHOR, EDIT_AUTHOR } from './constants';

export function* getAuthor(action) {
  const requestURL = `${API_HOST}/authors/${action.slug}`;

  try {
    const author = yield call(request, requestURL);
    yield put(authorLoaded(author));
  } catch (err) {
    yield put(authorLoadingError(err));
  }
}

export function* editAuthor(action) {
  const requestURL = `${API_HOST}/authors`;
  if (action.author && !action.author.avatar) {
    delete action.author.avatar;
  }
  const formData = new FormData();
  for (const name of Object.keys(action.author)) {
    formData.append(name, action.author[name]);
  }
  try {
    const token = localStorage.getItem('authToken');
    const author = yield call(request, requestURL, {
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
    yield put(editSuccess(author));
  } catch (err) {
    yield put(editError(err));
  }
}

export default function* editAuthorSaga() {
  yield takeLatest(LOAD_AUTHOR, getAuthor);
  yield takeLatest(EDIT_AUTHOR, editAuthor);
}
