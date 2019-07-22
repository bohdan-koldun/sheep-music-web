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
  makeSelectAlbumData,
} from './selectors';
import { loadAlbum } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function Album({ onLoadAlbum, match, albumData }) {
  useInjectReducer({ key: 'album', reducer });
  useInjectSaga({ key: 'album', saga });

  useEffect(() => {
    onLoadAlbum(match.params.slug);
  }, []);

  return (
    <React.Fragment>
      {albumData && (
        <div>
          <Helmet>
            <title>{albumData.title}</title>
            <meta name="description" content="Description of Album" />
          </Helmet>
          <h1>{albumData.title}</h1>
          <b>{albumData.year}</b>
          {albumData.thumbnail && (
            <img
              src={albumData.thumbnail.path}
              alt={albumData.title}
              style={{ width: '70%', display: 'block' }}
            />
          )}
          <div>{albumData.description}</div>
        </div>
      )}
    </React.Fragment>
  );
}

Album.propTypes = {
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // loading: PropTypes.bool,
  albumData: PropTypes.object,
  onLoadAlbum: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  albumData: makeSelectAlbumData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAlbum: slug => dispatch(loadAlbum(slug)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Album);
