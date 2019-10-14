import {
  LOAD_TAGS,
  LOAD_TAGS_SUCCESS,
  LOAD_TAGS_ERROR,
  LOAD_USER,
  LOAD_USER_ERROR,
  LOAD_USER_SUCCESS,
  LOGOUT,
} from './constants';

export function loadTags() {
  return {
    type: LOAD_TAGS,
  };
}

export function tagsLoaded(tags) {
  return {
    type: LOAD_TAGS_SUCCESS,
    tags,
  };
}

export function tagsLoadingError(error) {
  return {
    type: LOAD_TAGS_ERROR,
    error,
  };
}

export function loadUser(token) {
  return {
    type: LOAD_USER,
    token,
  };
}

export function userLoaded(user) {
  return {
    type: LOAD_USER_SUCCESS,
    user,
  };
}

export function userLoadingError(error) {
  return {
    type: LOAD_USER_ERROR,
    error,
  };
}

export function logout() {
  localStorage.removeItem('authToken');
  return {
    type: LOGOUT,
  };
}
