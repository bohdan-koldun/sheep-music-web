import {
  LOAD_ALBUM,
  LOAD_ALBUM_SUCCESS,
  LOAD_ALBUM_ERROR,
  EDIT_ALBUM,
  EDIT_ALBUM_SUCCESS,
  EDIT_ALBUM_ERROR,
  LOAD_AUTHOR_IDS,
  LOAD_AUTHOR_IDS_ERROR,
  LOAD_AUTHOR_IDS_SUCCESS,
} from './constants';

export function loadAlbum(slug) {
  return {
    type: LOAD_ALBUM,
    slug,
  };
}

export function albumLoaded(album) {
  return {
    type: LOAD_ALBUM_SUCCESS,
    album,
  };
}

export function albumLoadingError(error) {
  return {
    type: LOAD_ALBUM_ERROR,
    error,
  };
}

export function loadAuthorIds() {
  return {
    type: LOAD_AUTHOR_IDS,
  };
}

export function authorIdsLoaded(authors) {
  return {
    type: LOAD_AUTHOR_IDS_SUCCESS,
    authors,
  };
}

export function authorIdsLoadingError(error) {
  return {
    type: LOAD_AUTHOR_IDS_ERROR,
    error,
  };
}

export function editAlbum(album) {
  return {
    type: EDIT_ALBUM,
    album,
  };
}

export function editSuccess(album) {
  return {
    type: EDIT_ALBUM_SUCCESS,
    album,
  };
}

export function editError(error) {
  return {
    type: EDIT_ALBUM_ERROR,
    error,
  };
}
