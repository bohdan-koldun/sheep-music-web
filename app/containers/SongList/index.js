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

import Pagination from 'components/Pagination';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { loadSongList } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongList,
} from './selectors';

export function SongList({ songs, onLoadSongList, location, onPaginate }) {
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
          {songs.results.map(song => (
            <div key={song.slug}>
              <Link to={`/song/${song.slug}`}>{song.title}</Link>
              <br />
            </div>
          ))}
          <Pagination
            pageCount={songs.countPages}
            forcePage={songs.curPage}
            onPageChange={paginate}
          />
        </div>
      ) : null}
    </div>
  );
}

SongList.propTypes = {
  //  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // loading: PropTypes.bool,
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
};

const mapStateToProps = createStructuredSelector({
  songs: makeSelectSongList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSongList: page => dispatch(loadSongList(page)),
    onPaginate: page => dispatch(push(`/songs?page=${page}`)),
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
