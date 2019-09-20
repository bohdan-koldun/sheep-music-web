import {
  LOAD_VIDEO_LIST,
  LOAD_VIDEO_LIST_SUCCESS,
  LOAD_VIDEO_LIST_ERROR,
  CHANGE_VIDEO_LIST_PAGE,
  CHANGE_VIDEO_LIST_FILTER,
  CHANGE_VIDEO_LIST_SEARCH,
} from './constants';

export function loadVideoList(page, search, filter) {
  return {
    type: LOAD_VIDEO_LIST,
    page,
    search,
    filter,
  };
}

export function videoListLoaded(videoList) {
  return {
    type: LOAD_VIDEO_LIST_SUCCESS,
    videoList,
  };
}

export function videoListLoadingError(error) {
  return {
    type: LOAD_VIDEO_LIST_ERROR,
    error,
  };
}

export function changeSearch(search) {
  return {
    type: CHANGE_VIDEO_LIST_SEARCH,
    search,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_VIDEO_LIST_PAGE,
    page,
  };
}

export function changeFilter(filter) {
  return {
    type: CHANGE_VIDEO_LIST_FILTER,
    filter,
  };
}
