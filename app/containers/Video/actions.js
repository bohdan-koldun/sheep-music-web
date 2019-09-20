import { LOAD_VIDEO, LOAD_VIDEO_SUCCESS, LOAD_VIDEO_ERROR } from './constants';

export function loadVideo(slug) {
  return {
    type: LOAD_VIDEO,
    slug,
  };
}

export function videoLoaded(video) {
  return {
    type: LOAD_VIDEO_SUCCESS,
    video,
  };
}

export function videoLoadingError(error) {
  return {
    type: LOAD_VIDEO_ERROR,
    error,
  };
}
