import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_TAGS, LOAD_USER } from 'containers/App/constants';
import {
  tagsLoaded,
  tagsLoadingError,
  userLoaded,
  userLoadingError,
} from 'containers/App/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';

export function* getTagsList() {
  const requestURL = `${API_HOST}/songs/tags/all`;
  try {
    const tags = yield call(request, requestURL);
    yield put(tagsLoaded(tags));
  } catch (err) {
    yield put(tagsLoadingError(err));
  }
}

export function* getUser() {
  const requestURL = `${API_HOST}/profile`;
  try {
    const token = localStorage.getItem('authToken');
    const user = yield call(request, requestURL, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      redirect: 'follow',
      referrer: 'no-referrer',
    });
    yield put(userLoaded(user));
  } catch (err) {
    yield put(userLoadingError(err));
    localStorage.removeItem('authToken');
  }
}

export default function* appSaga() {
  yield takeLatest(LOAD_TAGS, getTagsList);
  yield takeLatest(LOAD_USER, getUser);
}
