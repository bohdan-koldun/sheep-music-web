import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_AUTHOR_LIST } from 'containers/AuthorList/constants';
import {
  authorListLoaded,
  authorListLoadingError,
} from 'containers/AuthorList/actions';
import request from 'utils/request';
import { API_HOST } from '../../appConstants';

export function* getAuthorList(action) {
  const page = Number.isNaN(+action.page) ? 0 : +action.page;
  const requestURL = `${API_HOST}/authors?page=${page}&limit=40`;

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
