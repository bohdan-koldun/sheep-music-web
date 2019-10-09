import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_SONG } from 'containers/Song/constants';
import { songLoaded, songLoadingError } from 'containers/Song/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';

export function* getSong(action) {
  const requestURL = `${API_HOST}/songs/${action.slug}`;

  try {
    const song = yield call(request, requestURL);
    yield put(songLoaded(song));
  } catch (err) {
    yield put(songLoadingError(err));
  }
}

// Individual exports for testing
export default function* songSaga() {
  // Watches for LOAD_REPOS actions and calls get when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_SONG, getSong);
}
