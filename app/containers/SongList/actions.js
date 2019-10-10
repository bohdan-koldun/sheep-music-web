import {
  LOAD_SONG_LIST,
  LOAD_SONG_LIST_SUCCESS,
  LOAD_SONG_LIST_ERROR,
  CHANGE_SONG_LIST_SEARCH,
  CHANGE_SONG_LIST_PAGE,
  CHANGE_SONG_LIST_FILTER,
  CHANGE_SONG_LIST_TAGS_FILTER,
} from './constants';

export function loadSongList(page, search, filter, tags) {
  return {
    type: LOAD_SONG_LIST,
    page,
    search,
    filter,
    tags,
  };
}

export function songListLoaded(songList) {
  return {
    type: LOAD_SONG_LIST_SUCCESS,
    songList,
  };
}

export function songListLoadingError(error) {
  return {
    type: LOAD_SONG_LIST_ERROR,
    error,
  };
}

export function changeSearch(search) {
  return {
    type: CHANGE_SONG_LIST_SEARCH,
    search,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_SONG_LIST_PAGE,
    page,
  };
}

export function changeFilter(filter) {
  return {
    type: CHANGE_SONG_LIST_FILTER,
    filter,
  };
}

export function changeTagsFilter(tagsFilter) {
  return {
    type: CHANGE_SONG_LIST_TAGS_FILTER,
    tagsFilter,
  };
}
