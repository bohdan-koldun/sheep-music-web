import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAudioPlayerDomain = state => state.audioPlayer || initialState;

const makeSelectPlay = () =>
  createSelector(
    selectAudioPlayerDomain,
    audioPlayer => audioPlayer.play,
  );

const makeSelectShowPlayer = () =>
  createSelector(
    selectAudioPlayerDomain,
    audioPlayer => audioPlayer.showPlayer,
  );

const makeSelectShowPlayerList = () =>
  createSelector(
    selectAudioPlayerDomain,
    audioPlayer => audioPlayer.showPlayerList,
  );

const makeSelectAudioPlayData = () =>
  createSelector(
    selectAudioPlayerDomain,
    audioPlayer => audioPlayer.playData,
  );

const makeSelectAudioPlayerList = () =>
  createSelector(
    selectAudioPlayerDomain,
    audioPlayer => audioPlayer.playList,
  );

export {
  selectAudioPlayerDomain,
  makeSelectPlay,
  makeSelectShowPlayer,
  makeSelectShowPlayerList,
  makeSelectAudioPlayData,
  makeSelectAudioPlayerList,
};
