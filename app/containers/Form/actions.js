import {
  LOAD_AUTHOR_IDS,
  LOAD_AUTHOR_IDS_ERROR,
  LOAD_AUTHOR_IDS_SUCCESS,
  LOAD_ALBUM_IDS,
  LOAD_ALBUM_IDS_ERROR,
  LOAD_ALBUM_IDS_SUCCESS,
} from './constants';

export function loadAuthorIds(albumId) {
  return {
    type: LOAD_AUTHOR_IDS,
    albumId,
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

export function loadAlbumIds(authorId) {
  return {
    type: LOAD_ALBUM_IDS,
    authorId,
  };
}

export function albumIdsLoaded(albums) {
  return {
    type: LOAD_ALBUM_IDS_SUCCESS,
    albums,
  };
}

export function albumIdsLoadingError(error) {
  return {
    type: LOAD_ALBUM_IDS_ERROR,
    error,
  };
}
