import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import { LOAD_TOP_AUTHOR } from './constants';
import { topAuthorsLoaded, topAuthorsLoadingError } from './actions';

export function* getTopAuthors(action) {
  const requestURL = `${API_HOST}/statistic/top/authors?days=${
    action.days
  }&count=${action.count}`;

  try {
    const data = yield call(request, requestURL);
    yield put(topAuthorsLoaded(data));
  } catch (err) {
    yield put(topAuthorsLoadingError(err));
  }
}

export default function* topAuthorsSaga() {
  yield takeLatest(LOAD_TOP_AUTHOR, getTopAuthors);
}
