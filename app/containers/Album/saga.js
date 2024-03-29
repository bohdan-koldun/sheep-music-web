import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_ALBUM } from 'containers/Album/constants';
import { albumLoaded, albumLoadingError } from 'containers/Album/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import viewCounter from 'utils/viewCounter';

export function* getAlbum(action) {
  const requestURL = `${API_HOST}/albums/${action.slug}`;

  try {
    const album = yield call(request, requestURL);
    yield put(albumLoaded(album));
    viewCounter('album', album && album.id);
  } catch (err) {
    yield put(albumLoadingError(err));
  }
}

// Individual exports for testing
export default function* albumSaga() {
  yield takeLatest(LOAD_ALBUM, getAlbum);
}
