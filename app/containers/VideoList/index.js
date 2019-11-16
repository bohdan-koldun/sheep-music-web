/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import Breadcrumb from 'components/Breadcrumb';
import { useIntl } from 'containers/LanguageProvider';
import menuMessages from 'components/SideMenu/messages';
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
  history,
  onChangePage,
  onChangeSearch,
  onChangeFilter,
}) {
  useInjectReducer({ key: 'videoList', reducer });
  useInjectSaga({ key: 'videoList', saga });

  const intl = useIntl();

  const myRef = useRef(null);
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 20);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    const urlPage = currentUrlParams.get('page');
    const urlSearch = currentUrlParams.get('search');
    const urlFilter = currentUrlParams.get('filter');

    if (urlSearch) {
      onChangeSearch(urlSearch);
    }
    if (urlFilter) {
      onChangeFilter({ value: urlFilter });
    }
    if (urlPage && !Number.isNaN(urlPage)) {
      onChangePage(Number.parseInt(urlPage, 10));
    }
  }, []);

  const changeURLSearchParams = (value, name, currentUrlParams) => {
    if (value) {
      currentUrlParams.set(name, value);
    } else {
      currentUrlParams.delete(name);
    }
  };

  useEffect(() => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    changeURLSearchParams(search, 'search', currentUrlParams);
    changeURLSearchParams(filter && filter.value, 'filter', currentUrlParams);
    changeURLSearchParams(page, 'page', currentUrlParams);
    history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

    onLoadVideoList(page, search, filter.value);
  }, [page, search, filter]);

  return (
    <div>
      <Helmet>
      <title>Видеоклипы Христианских Песен | Youtube</title>
        <meta
          name="description"
          content="Видео песен христианских исполнителей: смотреть видео онлайн с Youtube."
        />
      </Helmet>

      <Breadcrumb
        pageList={[
          {
            link: '/videos',
            name: intl.formatMessage(menuMessages.videos),
          },
        ]}
      />

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
  history: PropTypes.object,
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
