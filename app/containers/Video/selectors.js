import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectVideoDomain = state => state.video || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectVideoDomain,
    videoState => videoState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectVideoDomain,
    videoState => videoState.error,
  );

const makeSelectVideoData = () =>
  createSelector(
    selectVideoDomain,
    videoState => videoState.videoData,
  );

export {
  selectVideoDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectVideoData,
};
