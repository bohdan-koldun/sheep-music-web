/* eslint-disable indent */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md';

import Pagination from 'components/Pagination';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import { loadSongList } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './SongList.scss';

export function SongList({
  songs,
  onLoadSongList,
  location,
  onPaginate,
  onPlaySongList,
  onPlayPause,
  play,
  playData,
}) {
  useInjectReducer({ key: 'songList', reducer });
  useInjectSaga({ key: 'songList', saga });

  const paginate = page => {
    onPaginate(page.selected);
    onLoadSongList(page.selected);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    onLoadSongList(params.get('page'));
  }, []);

  const playPauseSong = song => {
    if (playData && playData.song && song && song.id === playData.song.id) {
      onPlayPause(song.id);
    } else {
      onPlaySongList(song, songs.results || []);
    }
  };

  return (
    <div>
      <Helmet>
        <title> Песни </title>
        <meta
          name="description"
          content="Христианские песни: слова, аудио, mp3, текст, аккорды"
        />
      </Helmet>
      {songs && songs.results ? (
        <div>
          <ul className="song-list">
            {songs.results.map(song => (
              <li key={song.slug}>
                <button
                  type="button"
                  onClick={() => playPauseSong(song)}
                  className="icon-button"
                >
                  {play &&
                  playData &&
                  playData.song &&
                  song.id === playData.song.id ? (
                    <MdPauseCircleFilled
                      //     data-tip={intl.formatMessage(messages.pause)}
                      className="song-icon"
                    />
                  ) : (
                    song.audioMp3 &&
                    song.audioMp3.path && (
                      <MdPlayCircleFilled
                        //    data-tip={intl.formatMessage(messages.play)}
                        className="song-icon"
                      />
                    )
                  )}
                </button>
                <Link to={`/song/${song.slug}`}>{song.title}</Link>
                <br />
              </li>
            ))}
          </ul>
          <Pagination
            pageCount={songs.countPages}
            forcePage={Number(songs.curPage)}
            onPageChange={paginate}
          />
        </div>
      ) : null}
    </div>
  );
}

SongList.propTypes = {
  songs: PropTypes.shape({
    result: PropTypes.object,
    pageTotal: PropTypes.number,
    total: PropTypes.number,
  }),
  onLoadSongList: PropTypes.func,
  onPaginate: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
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

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  songs: makeSelectSongList(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSongList: page => dispatch(loadSongList(page)),
    onPaginate: page => dispatch(push(`/songs?page=${page}`)),
    onPlaySongList: (song, songList) => dispatch(setSongList(song, songList)),
    onPlayPause: () => dispatch(setPlayPause()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SongList);
