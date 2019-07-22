import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorData,
} from './selectors';
import { loadAuthor } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function Author({ onLoadAuthor, match, authorData }) {
  useInjectReducer({ key: 'author', reducer });
  useInjectSaga({ key: 'author', saga });

  useEffect(() => {
    onLoadAuthor(match.params.slug);
  }, []);

  return (
    <React.Fragment>
      {authorData && (
        <div>
          <Helmet>
            <title>{authorData.title}</title>
            <meta name="description" content="Description of Author" />
          </Helmet>
          <h1>{authorData.title}</h1>
          <b>{authorData.year}</b>
          {authorData.thumbnail && (
            <img
              src={authorData.thumbnail.path}
              alt={authorData.title}
              style={{ width: '70%', display: 'block' }}
            />
          )}

          <div>{authorData.description}</div>
        </div>
      )}
    </React.Fragment>
  );
}

Author.propTypes = {
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // loading: PropTypes.bool,
  authorData: PropTypes.object,
  onLoadAuthor: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  authorData: makeSelectAuthorData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAuthor: slug => dispatch(loadAuthor(slug)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Author);
