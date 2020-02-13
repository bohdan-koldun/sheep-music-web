import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_VIDEO_LIST } from 'containers/VideoList/constants';
import {
  videoListLoaded,
  videoListLoadingError,
} from 'containers/VideoList/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';

export function* getVideoList(action) {
  const requestURL = `${API_HOST}/videos?page=${action.page}&keyword=${
    action.search
  }&limit=15&filter=${action.filter}`;

  try {
    const videos = yield call(request, requestURL);
    yield put(videoListLoaded(videos));
  } catch (err) {
    yield put(videoListLoadingError(err));
  }
}

export default function* videoSaga() {
  yield takeLatest(LOAD_VIDEO_LIST, getVideoList);
}
