import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';
import { LOAD_STATISTIC } from './constants';
import { statisticLoaded, statisticLoadingError } from './actions';

export function* getStatictic() {
  const requestURL = `${API_HOST}/statistic/top?filter=popular&count=15`;

  try {
    const data = yield call(request, requestURL);
    yield put(statisticLoaded(data));
  } catch (err) {
    yield put(statisticLoadingError(err));
  }
}

export default function* statisticSaga() {
  yield takeLatest(LOAD_STATISTIC, getStatictic);
}
