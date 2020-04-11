import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import Loader from 'components/Loader';
import { DaysFilter } from 'components/Filter';
import { AlbumPictureListCarousel } from 'components/List';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectTopAlbums,
} from './selectors';
import messages from '../messages';
import { loadTopAlbums } from './actions';
import reducer from './reducer';
import saga from './saga';

export function TopAlbums({ onLoadTopAlbums, albums, loading, count = 10 }) {
  useInjectReducer({ key: 'topAlbumsState', reducer });
  useInjectSaga({ key: 'topAlbumsState', saga });

  const [days, setDays] = useState(7);

  useEffect(() => {
    onLoadTopAlbums(days, count);
  }, [days]);

  return (
    <section>
      <div>
        <div>
          <h2>
            <FormattedMessage {...messages.popularAlbums} />
          </h2>
          <hr />
          <div>
            <DaysFilter onChange={setDays} />
          </div>
          <div style={{ height: '300px' }}>
            {loading ? (
              <Loader />
            ) : (
              <AlbumPictureListCarousel albums={albums} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

TopAlbums.propTypes = {
  count: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  albums: PropTypes.array,
  onLoadTopAlbums: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  albums: makeSelectTopAlbums(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTopAlbums: (days, count) => dispatch(loadTopAlbums(days, count)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TopAlbums);
