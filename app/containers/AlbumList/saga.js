import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_ALBUM_LIST } from 'containers/AlbumList/constants';
import {
  albumListLoaded,
  albumListLoadingError,
} from 'containers/AlbumList/actions';
import request from 'utils/request';
import { API_HOST } from '../../appConstants';

export function* getAlbumList(action) {
  const requestURL = `${API_HOST}/albums?page=${action.page}&limit=40`;

  try {
    const albums = yield call(request, requestURL);
    yield put(albumListLoaded(albums));
  } catch (err) {
    yield put(albumListLoadingError(err));
  }
}

export default function* albumSaga() {
  yield takeLatest(LOAD_ALBUM_LIST, getAlbumList);
}
