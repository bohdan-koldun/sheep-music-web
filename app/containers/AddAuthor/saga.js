import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import { addAuthorError, addAuthorSuccess } from './actions';
import { ADD_AUTHOR } from './constants';

export function* addAuthor(action) {
  const requestURL = `${API_HOST}/authors`;
  try {
    const token = localStorage.getItem('authToken');
    const author = yield call(request, requestURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(action.author),
    });
    yield put(addAuthorSuccess(author));
  } catch (err) {
    yield put(addAuthorError(err && err.response));
  }
}

export default function* addAuthorSaga() {
  yield takeLatest(ADD_AUTHOR, addAuthor);
}
