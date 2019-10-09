import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_TAGS } from 'containers/App/constants';
import { tagsLoaded, tagsLoadingError } from 'containers/App/actions';
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

export default function* appSaga() {
  yield takeLatest(LOAD_TAGS, getTagsList);
}
