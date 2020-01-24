import {
  ADD_AUTHOR,
  ADD_AUTHOR_SUCCESS,
  ADD_AUTHOR_ERROR,
  UPDATE_AUTHOR_STORE,
  CLEAR_AUTHOR_STORE,
} from './constants';

export function addAuthor(author) {
  return {
    type: ADD_AUTHOR,
    author,
  };
}

export function updateAuthorStore(author) {
  return {
    type: UPDATE_AUTHOR_STORE,
    author,
  };
}

export function clearAuthorStore() {
  return {
    type: CLEAR_AUTHOR_STORE,
  };
}

export function addAuthorSuccess(author) {
  return {
    type: ADD_AUTHOR_SUCCESS,
    author,
  };
}

export function addAuthorError(error) {
  return {
    type: ADD_AUTHOR_ERROR,
    error,
  };
}
