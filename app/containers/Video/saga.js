import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_VIDEO } from 'containers/Video/constants';
import { videoLoaded, videoLoadingError } from 'containers/Video/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import viewCounter from 'utils/viewCounter';

export function* getVideo(action) {
  const requestURL = `${API_HOST}/videos/${action.slug}`;

  try {
    const video = yield call(request, requestURL);
    yield put(videoLoaded(video));
    viewCounter('song', video && video.id);
  } catch (err) {
    yield put(videoLoadingError(err));
  }
}

// Individual exports for testing
export default function* videoSaga() {
  yield takeLatest(LOAD_VIDEO, getVideo);
}
