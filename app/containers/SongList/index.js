/* eslint-disable indent */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

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

export function SongList({ songs, onLoadSongList }) {
  useInjectReducer({ key: 'songList', reducer });
  useInjectSaga({ key: 'songList', saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    onLoadSongList(20);
  }, []);

  return (
    <div>
      <Helmet>
        <title> SongList </title>
        <meta name="description" content="Description of SongList" />
      </Helmet>
      {songs && songs.results
        ? songs.results.map(song => (
            <div key={song.slug}>
              <Link to={`/song/${song.slug}`}>{song.title}</Link>
              <br />
            </div>
          ))
        : null}
    </div>
  );
}

SongList.propTypes = {
  //  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  //  loading: PropTypes.bool,
  songs: PropTypes.shape({
    result: PropTypes.object,
    pageTotal: PropTypes.number,
    total: PropTypes.number,
  }),
  onLoadSongList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  songs: makeSelectSongList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSongList: page => dispatch(loadSongList(page)),
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
