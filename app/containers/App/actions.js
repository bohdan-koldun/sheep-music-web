import { LOAD_TAGS, LOAD_TAGS_SUCCESS, LOAD_TAGS_ERROR } from './constants';
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
