import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_AUTHOR } from 'containers/Author/constants';
import { authorLoaded, authorLoadingError } from 'containers/Author/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';

export function* getAuthor(action) {
  const requestURL = `${API_HOST}/authors/${action.slug}`;

  try {
    const author = yield call(request, requestURL);
    yield put(authorLoaded(author));
  } catch (err) {
    yield put(authorLoadingError(err));
  }
}

// Individual exports for testing
export default function* authorSaga() {
  yield takeLatest(LOAD_AUTHOR, getAuthor);
}
