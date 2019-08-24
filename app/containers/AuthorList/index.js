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
import { AuhorPictureList } from 'components/List';
import reducer from './reducer';
import saga from './saga';
import { 
  loadAuthorList,
  changeSearch,
  changePage,
  changeFilter,
 } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorList,
  makeSelectAuthorListPage,
  makeSelectAuthorListSearch,
  makeSelectAuthorListFilter,
} from './selectors';
import messages from './messages';

export function AuthorList({
  authors,
  onLoadAuthorList,
  page,
  search,
  filter,
  onChangePage,
  onChangeSearch,
  onChangeFilter,
}) {
  useInjectReducer({ key: 'authorList', reducer });
  useInjectSaga({ key: 'authorList', saga });

  const myRef = useRef(null);
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 20);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    onLoadAuthorList(page, search, filter.value);
  }, [page, search, filter]);

  return (
    <div>
      <Helmet>
        <title>Авторы </title>
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
        count={(authors && authors.total) || 0}
        page={authors && 1 + Number.parseInt(authors.curPage, 10)}
      />

      {authors && authors.results ? (
        <div>
          <AuhorPictureList authors={authors.results}/>
          <Pagination
            pageCount={authors.countPages}
            forcePage={Number(authors.curPage)}
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

AuthorList.propTypes = {
  authors: PropTypes.shape({
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
  onLoadAuthorList: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeFilter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  authors: makeSelectAuthorList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  page: makeSelectAuthorListPage(),
  search: makeSelectAuthorListSearch(),
  filter: makeSelectAuthorListFilter(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAuthorList: (page, search, filter) => dispatch(loadAuthorList(page, search, filter)),
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
)(AuthorList);
