import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_SONG_LIST } from 'containers/SongList/constants';
import {
  songListLoaded,
  songListLoadingError,
} from 'containers/SongList/actions';
import request from 'utils/request';
import { API_HOST } from '../../appConstants';

export function* getSongList(action) {
  const requestURL = `${API_HOST}/songs?page=${action.page}&limit=40`;

  try {
    const songs = yield call(request, requestURL);
    yield put(songListLoaded(songs));
  } catch (err) {
    yield put(songListLoadingError(err));
  }
}

export default function* songSaga() {
  yield takeLatest(LOAD_SONG_LIST, getSongList);
}
