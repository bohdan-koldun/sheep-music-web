/* eslint-disable indent */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import Pagination from 'components/Pagination';
import { AlbumPictureList } from 'components/List';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { loadAlbumList } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumList,
} from './selectors';

export function AlbumList({ albums, onLoadAlbumList, location, onPaginate }) {
  useInjectReducer({ key: 'albumList', reducer });
  useInjectSaga({ key: 'albumList', saga });

  const paginate = page => {
    onPaginate(page.selected);
    onLoadAlbumList(page.selected);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    onLoadAlbumList(params.get('page'));
  }, []);

  return (
    <div>
      <Helmet>
        <title> Альбомы </title>
        <meta
          name="description"
          content="Христианские песни: слова, аудио, mp3, текст, аккорды"
        />
      </Helmet>
      {albums && albums.results ? (
        <div>
          <AlbumPictureList albums={albums.results} />
          <Pagination
            pageCount={albums.countPages}
            forcePage={Number(albums.curPage)}
            onPageChange={paginate}
          />
        </div>
      ) : null}
    </div>
  );
}

AlbumList.propTypes = {
  //  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // loading: PropTypes.bool,
  albums: PropTypes.shape({
    result: PropTypes.object,
    pageTotal: PropTypes.number,
    total: PropTypes.number,
  }),
  onLoadAlbumList: PropTypes.func,
  onPaginate: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  albums: makeSelectAlbumList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAlbumList: page => dispatch(loadAlbumList(page)),
    onPaginate: page => dispatch(push(`/albums?page=${page}`)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AlbumList);
