import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useIntl } from 'containers/LanguageProvider';
import { AiTwotoneFire } from 'react-icons/ai';
import { createStructuredSelector } from 'reselect';
import Loader from 'components/Loader';
import { DaysFilter } from 'components/Filter';
import { SongPlayList } from 'components/List';
import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectTopSongs,
} from './selectors';
import messages from '../messages';
import { loadTopSongs } from './actions';
import reducer from './reducer';
import saga from './saga';
import './TopSongs.scss';

export function TopSongs({
  onLoadTopSongs,
  songs,
  loading,
  count = 10,
  play,
  playData,
  onPlaySongList,
  onPlayPause,
}) {
  useInjectReducer({ key: 'topSongsState', reducer });
  useInjectSaga({ key: 'topSongsState', saga });

  const intl = useIntl();

  const [days, setDays] = useState(7);

  useEffect(() => {
    onLoadTopSongs(days, count);
  }, [days]);

  const playPauseSong = song => {
    if (playData && playData.song && song && song.id === playData.song.id) {
      onPlayPause(song.id);
    } else if (song && song.audioMp3 && song.audioMp3.path) {
      onPlaySongList(song, songs || []);
    }
  };

  return (
    <section className="top-songs">
      <h2>
        <AiTwotoneFire />
        {intl.formatMessage(messages.popularSongs).toLowerCase()}
      </h2>
      <hr />
      <div>
        <DaysFilter onChange={setDays} days={days} />
      </div>
      <div className="songs-top-list">
        {loading ? (
          <Loader marginTop="70px" />
        ) : (
          <SongPlayList
            songs={songs}
            playPauseSong={playPauseSong}
            playData={playData}
            play={play}
          />
        )}
      </div>
    </section>
  );
}

TopSongs.propTypes = {
  count: PropTypes.number,
  loading: PropTypes.bool,
  songs: PropTypes.array,
  onLoadTopSongs: PropTypes.func,
  play: PropTypes.bool,
  playData: PropTypes.shape({
    song: PropTypes.shape({
      title: PropTypes.string,
      audioMp3: PropTypes.shape({
        path: PropTypes.string,
      }),
    }),
    prevPlayListId: PropTypes.number,
    nextPlayListId: PropTypes.number,
  }),
  onPlaySongList: PropTypes.func,
  onPlayPause: PropTypes.func,
};

TopSongs.contextTypes = {
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  songs: makeSelectTopSongs(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTopSongs: (days, count) => dispatch(loadTopSongs(days, count)),
    onPlaySongList: (song, songList) => dispatch(setSongList(song, songList)),
    onPlayPause: () => dispatch(setPlayPause()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TopSongs);
