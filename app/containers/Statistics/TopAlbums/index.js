import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useIntl } from 'containers/LanguageProvider';
import { AiTwotoneFire } from 'react-icons/ai';
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
import './TopAlbums.scss';

export function TopAlbums({ onLoadTopAlbums, albums, loading, count = 10 }) {
  useInjectReducer({ key: 'topAlbumsState', reducer });
  useInjectSaga({ key: 'topAlbumsState', saga });

  const intl = useIntl();

  const [days, setDays] = useState(7);

  useEffect(() => {
    onLoadTopAlbums(days, count);
  }, [days]);

  return (
    <section className="top-albums">
      <h2>
        <AiTwotoneFire />
        {intl.formatMessage(messages.popularAlbums).toLowerCase()}
      </h2>
      <hr />
      <div>
        <DaysFilter onChange={setDays} days={days} />
      </div>
      <div className="albums-carousel">
        {loading ? (
          <Loader marginTop="0" />
        ) : (
          <AlbumPictureListCarousel albums={albums} />
        )}
      </div>
    </section>
  );
}

TopAlbums.propTypes = {
  count: PropTypes.number,
  loading: PropTypes.bool,
  albums: PropTypes.array,
  onLoadTopAlbums: PropTypes.func,
};

TopAlbums.contextTypes = {
  intl: PropTypes.object.isRequired,
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
