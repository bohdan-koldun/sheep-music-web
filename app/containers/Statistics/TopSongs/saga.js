import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import { LOAD_TOP_SONGS } from './constants';
import { topSongsLoaded, topSongsLoadingError } from './actions';

export function* getTopSongs(action) {
  const requestURL = `${API_HOST}/statistic/top/songs?days=${
    action.days
  }&count=${action.count}`;

  try {
    const data = yield call(request, requestURL);
    yield put(topSongsLoaded(data));
  } catch (err) {
    yield put(topSongsLoadingError(err));
  }
}

export default function* topSongsSaga() {
  yield takeLatest(LOAD_TOP_SONGS, getTopSongs);
}
