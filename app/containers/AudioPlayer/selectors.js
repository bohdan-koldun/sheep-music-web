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

const makeSelectAudioPlayerSong = () =>
  createSelector(
    selectAudioPlayerDomain,
    audioPlayer => audioPlayer.playSong,
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
  makeSelectAudioPlayerSong,
  makeSelectAudioPlayerList,
};
