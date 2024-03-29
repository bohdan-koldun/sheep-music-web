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
import menuMessages from 'components/Menu/messages';
import Pagination from 'components/Pagination';
import { AlbumPictureList } from 'components/List';
import { ListFilter } from 'components/Filter';
import { SearchInfo } from 'components/Info';
import Loader from 'components/Loader';
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
  loading,
  onLoadAlbumList,
  page,
  search,
  filter,
  history,
  onChangePage,
  onChangeSearch,
  onChangeFilter,
}) {
  useInjectReducer({ key: 'albumList', reducer });
  useInjectSaga({ key: 'albumList', saga });

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

    onLoadAlbumList(page, search, filter.value);
  }, [page, search, filter]);

  return (
    <div>
      <Helmet>
        <title>Сборник Альбомов Христианских Песен</title>
        <meta
          name="description"
          content="Христианские песни: слушать онлайн, скачать, слова, текст, аккорды, фонограммы"
        />
      </Helmet>

      <Breadcrumb
        pageList={[
          {
            link: '/albums',
            name: intl.formatMessage(menuMessages.albums),
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

      {!loading ? (
        <React.Fragment>
          <SearchInfo
            count={(albums && albums.total) || 0}
            page={albums && 1 + Number.parseInt(albums.curPage, 10)}
            search={search}
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
        </React.Fragment>
      ) : (
        (loading && <Loader />) || null
      )}
    </div>
  );
}

AlbumList.propTypes = {
  loading: PropTypes.bool,
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
  history: PropTypes.object,
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
