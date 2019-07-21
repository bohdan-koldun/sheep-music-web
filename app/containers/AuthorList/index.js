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
import { loadAuthorList } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorList,
} from './selectors';
import './AuthorList.scss';

export function AuthorList({
  authors,
  onLoadAuthorList,
  location,
  onPaginate,
}) {
  useInjectReducer({ key: 'authorList', reducer });
  useInjectSaga({ key: 'authorList', saga });

  const paginate = page => {
    onPaginate(page.selected);
    onLoadAuthorList(page.selected);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    onLoadAuthorList(params.get('page'));
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
      {authors && authors.results ? (
        <div>
          <ul className="multi-column">
            {authors.results.map(author => (
              <li key={author.slug}>
                <Link to={`/author/${author.slug}`}>{author.title}</Link>
                <br />
              </li>
            ))}
          </ul>
          <Pagination
            pageCount={authors.countPages}
            forcePage={Number(authors.curPage)}
            onPageChange={paginate}
          />
        </div>
      ) : null}
    </div>
  );
}

AuthorList.propTypes = {
  //  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // loading: PropTypes.bool,
  authors: PropTypes.shape({
    result: PropTypes.object,
    pageTotal: PropTypes.number,
    total: PropTypes.number,
  }),
  onLoadAuthorList: PropTypes.func,
  onPaginate: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  authors: makeSelectAuthorList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAuthorList: page => dispatch(loadAuthorList(page)),
    onPaginate: page => dispatch(push(`/authors?page=${page}`)),
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
