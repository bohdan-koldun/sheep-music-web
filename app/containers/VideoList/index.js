/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import Pagination from 'components/Pagination';
import { ListFilter } from 'components/Filter';
import { SearchInfo } from 'components/Info';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { VideoYoutubeList } from 'components/List';
import reducer from './reducer';
import saga from './saga';
import { 
  loadVideoList,
  changeSearch,
  changePage,
  changeFilter,
 } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectVideoList,
  makeSelectVideoListPage,
  makeSelectVideoListSearch,
  makeSelectVideoListFilter,
} from './selectors';
import messages from './messages';

export function VideoList({
  videos,
  onLoadVideoList,
  page,
  search,
  filter,
  onChangePage,
  onChangeSearch,
  onChangeFilter,
}) {
  useInjectReducer({ key: 'videoList', reducer });
  useInjectSaga({ key: 'videoList', saga });

  const myRef = useRef(null);
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 20);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    onLoadVideoList(page, search, filter.value);
  }, [page, search, filter]);

  return (
    <div>
      <Helmet>
      <title>Авторы, Исполнители Христианских Песен</title>
        <meta
          name="description"
          content="Песни христианских исполнителей: слушать онлайн, скачать, слова, текст, аккорды, фонограммы"
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
        count={(videos && videos.total) || 0}
        page={videos && 1 + Number.parseInt(videos.curPage, 10)}
        search={search}
      />

      {videos && videos.results ? (
        <div>
          <VideoYoutubeList videos={videos.results}/>
          <Pagination
            pageCount={videos.countPages}
            forcePage={Number(videos.curPage)}
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

VideoList.propTypes = {
  videos: PropTypes.shape({
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
  onLoadVideoList: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeFilter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  videos: makeSelectVideoList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  page: makeSelectVideoListPage(),
  search: makeSelectVideoListSearch(),
  filter: makeSelectVideoListFilter(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadVideoList: (page, search, filter) => dispatch(loadVideoList(page, search, filter)),
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
)(VideoList);
