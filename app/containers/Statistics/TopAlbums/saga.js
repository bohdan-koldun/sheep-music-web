import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import { LOAD_TOP_ALBUMS } from './constants';
import { topAlbumsLoaded, topAlbumsLoadingError } from './actions';

export function* getTopAlbums(action) {
  const requestURL = `${API_HOST}/statistic/top/albums?days=${
    action.days
  }&count=${action.count}`;

  try {
    const data = yield call(request, requestURL);
    yield put(topAlbumsLoaded(data));
  } catch (err) {
    yield put(topAlbumsLoadingError(err));
  }
}

export default function* topAlbumsSaga() {
  yield takeLatest(LOAD_TOP_ALBUMS, getTopAlbums);
}
