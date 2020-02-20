import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_MODERATOR_STATISTIC } from 'containers/ModeratorStatistic/constants';
import {
  loadModeratorStatisticSuccess,
  loadModeratorStatisticError,
} from 'containers/ModeratorStatistic/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';

export function* loadModeratorStatistic() {
  const requestURL = `${API_HOST}/statistic/moderator`;

  try {
    const token = localStorage.getItem('authToken');

    const data = yield call(request, requestURL, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      redirect: 'follow',
      referrer: 'no-referrer',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(loadModeratorStatisticSuccess(data));
  } catch (err) {
    yield put(loadModeratorStatisticError(err));
  }
}

export default function* moderatorStatisticSaga() {
  yield takeLatest(LOAD_MODERATOR_STATISTIC, loadModeratorStatistic);
}
