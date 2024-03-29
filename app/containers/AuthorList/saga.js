import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_AUTHOR_LIST } from 'containers/AuthorList/constants';
import {
  authorListLoaded,
  authorListLoadingError,
} from 'containers/AuthorList/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';

export function* getAuthorList(action) {
  const requestURL = `${API_HOST}/authors?page=${action.page}&keyword=${
    action.search
  }&limit=40&filter=${action.filter}`;

  try {
    const authors = yield call(request, requestURL);
    yield put(authorListLoaded(authors));
  } catch (err) {
    yield put(authorListLoadingError(err));
  }
}

export default function* authorSaga() {
  yield takeLatest(LOAD_AUTHOR_LIST, getAuthorList);
}
