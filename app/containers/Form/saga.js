import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import {
  authorIdsLoaded,
  authorIdsLoadingError,
  albumIdsLoaded,
  albumIdsLoadingError,
} from './actions';
import { LOAD_AUTHOR_IDS, LOAD_ALBUM_IDS } from './constants';

export function* getAuthors(action) {
  const requestURL = `${API_HOST}/authors/list/id?albumId=${action.albumId}`;

  try {
    const authors = yield call(request, requestURL);
    yield put(authorIdsLoaded(authors));
  } catch (err) {
    yield put(authorIdsLoadingError(err));
  }
}

export function* getAlbums(action) {
  const requestURL = `${API_HOST}/albums/list/id?authorId=${action.authorId}`;

  try {
    const albums = yield call(request, requestURL);
    yield put(albumIdsLoaded(albums));
  } catch (err) {
    yield put(albumIdsLoadingError(err));
  }
}

export default function* editAlbumSaga() {
  yield takeLatest(LOAD_AUTHOR_IDS, getAuthors);
  yield takeLatest(LOAD_ALBUM_IDS, getAlbums);
}
