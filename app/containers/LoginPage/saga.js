import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from 'containers/LoginPage/constants';
import { loginSuccess, loginError } from 'containers/LoginPage/actions';
import request from 'utils/request';
import { API_HOST } from 'utils/constants';

export function* login(action) {
  const requestURL = `${API_HOST}/login`;

  try {
    const data = yield call(request, requestURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        email: action.email,
        password: action.password,
      }),
    });
    if (data && data.token) {
      localStorage.setItem('authToken', data.token.accessToken);
    }
    yield put(loginSuccess(data && data.user));
  } catch (err) {
    yield put(loginError(err));
  }
}

// Individual exports for testing
export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
