/* eslint-disable indent */
import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import Pagination from 'components/Pagination';
import { AlbumPictureList } from 'components/List';
import { ListFilter } from 'components/Filter';
import { SearchInfo } from 'components/Info';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {
  loadAlbumList,
  changeSearch,
  changePage,
  changeFilter,
} from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumList,
  makeSelectAlbumListPage,
  makeSelectAlbumListSearch,
  makeSelectAlbumListFilter,
} from './selectors';
import messages from './messages';

export function AlbumList({
  albums,
  onLoadAlbumList,
  page,
  search,
  filter,
  onChangePage,
  onChangeSearch,
  onChangeFilter,
}) {
  useInjectReducer({ key: 'albumList', reducer });
  useInjectSaga({ key: 'albumList', saga });

  const myRef = useRef(null);
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 20);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    onLoadAlbumList(page, search, filter.value);
  }, [page, search, filter]);

  return (
    <div>
      <Helmet>
        <title> Альбомы </title>
        <meta
          name="description"
          content="Христианские песни: слова, аудио, mp3, текст, аккорды"
        />
      </Helmet>
      <h1 ref={myRef}>
        <FormattedMessage {...messages.header} />
      </h1>
      <ListFilter
        search={search}
        filter={filter}
        onChangeSearch={onChangeSearch}
        onChangeFilter={onChangeFilter}
      />
      <SearchInfo
        count={(albums && albums.total) || 0}
        page={albums && 1 + Number.parseInt(albums.curPage, 10)}
      />

      {albums && albums.results ? (
        <div>
          <AlbumPictureList albums={albums.results} />
          <Pagination
            pageCount={albums.countPages}
            forcePage={Number(albums.curPage)}
            onPageChange={pageNum => {
              onChangePage(pageNum);
              executeScroll();
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

AlbumList.propTypes = {
  albums: PropTypes.shape({
    result: PropTypes.object,
    pageTotal: PropTypes.number,
    total: PropTypes.number,
  }),
  page: PropTypes.number,
  search: PropTypes.string,
  filter: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  onLoadAlbumList: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeFilter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  albums: makeSelectAlbumList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  page: makeSelectAlbumListPage(),
  search: makeSelectAlbumListSearch(),
  filter: makeSelectAlbumListFilter(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAlbumList: (page, search, filter) =>
      dispatch(loadAlbumList(page, search, filter)),
    onChangePage: page => dispatch(changePage(page)),
    onChangeSearch: search => dispatch(changeSearch(search)),
    onChangeFilter: filter => dispatch(changeFilter(filter)),
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
