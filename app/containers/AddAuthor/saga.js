/* eslint-disable no-restricted-syntax */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import { addAuthorError, addAuthorSuccess } from './actions';
import { ADD_AUTHOR } from './constants';

export function* addAuthor(action) {
  const requestURL = `${API_HOST}/authors`;
  const { author } = action;

  if (author && !author.avatar) {
    delete author.avatar;
  }

  const formData = new FormData();

  for (const name of Object.keys(author)) {
    formData.append(name, author[name]);
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
    yield put(addAuthorSuccess(result));
  } catch (err) {
    yield put(addAuthorError(err && err.response));
  }
}

export default function* addAuthorSaga() {
  yield takeLatest(ADD_AUTHOR, addAuthor);
}
