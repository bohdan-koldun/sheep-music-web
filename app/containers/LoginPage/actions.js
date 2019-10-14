import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export function login(email, password) {
  return {
    type: LOGIN,
    email,
    password,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
