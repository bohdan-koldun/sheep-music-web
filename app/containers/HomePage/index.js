import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/Breadcrumb';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import {
  AlbumPictureListCarousel,
  SongPlayList,
  AuthorPictureListCarousel,
} from 'components/List';
import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectStatisticData,
} from './selectors';
import messages from './messages';
import { loadStatistic } from './actions';
import reducer from './reducer';
import saga from './saga';

export function HomePage({
  onLoadStatistic,
  statisticData,
  play,
  playData,
  onPlaySongList,
  onPlayPause,
}) {
  useInjectReducer({ key: 'statisticHome', reducer });
  useInjectSaga({ key: 'statisticHome', saga });

  useEffect(() => {
    onLoadStatistic();
  }, []);

  const { songs, albums, authors } = statisticData || {};

  const playPauseSong = song => {
    if (playData && playData.song && song && song.id === playData.song.id) {
      onPlayPause(song.id);
    } else if (song && song.audioMp3 && song.audioMp3.path) {
      onPlaySongList(song, songs || []);
    }
  };

  return (
    <article>
      <Helmet>
        <title>Сайт-Агрегатор Христианской Музыки</title>
        <meta
          name="description"
          content="Sheep Music: слушать онлайн, скачать mp3, слова, текст, аккорды, фонограммы"
        />
        <link rel="canonical" href="https://sheep-music.com/album/" />
      </Helmet>
      <Breadcrumb />
      <div>
        <div>
          <h2>
            <FormattedMessage {...messages.popularAlbums} />:
          </h2>
          <AlbumPictureListCarousel albums={albums} />
        </div>
        <div>
          <h2>
            <FormattedMessage {...messages.popularAuthors} />:
          </h2>
          <AuthorPictureListCarousel authors={authors} />
        </div>
        <div>
          <h2>
            <FormattedMessage {...messages.popularSongs} />:
          </h2>
          <SongPlayList
            songs={songs}
            playPauseSong={playPauseSong}
            playData={playData}
            play={play}
          />
        </div>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  statisticData: PropTypes.object,
  onLoadStatistic: PropTypes.func,
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
  statisticData: makeSelectStatisticData(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadStatistic: () => dispatch(loadStatistic()),
    onPlaySongList: (song, songList) => dispatch(setSongList(song, songList)),
    onPlayPause: () => dispatch(setPlayPause()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
