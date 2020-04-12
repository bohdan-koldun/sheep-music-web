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
import { AuthorPictureListCarousel } from 'components/List';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectTopSongs,
} from './selectors';
import messages from '../messages';
import { loadTopSongs } from './actions';
import reducer from './reducer';
import saga from './saga';
import './TopSongs.scss';

export function TopSongs({ onLoadTopSongs, songs, loading, count = 10 }) {
  useInjectReducer({ key: 'topSongsState', reducer });
  useInjectSaga({ key: 'topSongsState', saga });

  const intl = useIntl();

  const [days, setDays] = useState(7);

  useEffect(() => {
    onLoadTopSongs(days, count);
  }, [days]);

  return (
    <section className="top-songs">
      <h2>
        <AiTwotoneFire />
        {intl.formatMessage(messages.popularSongs).toLowerCase()}
      </h2>
      <hr />
      <div>
        <DaysFilter onChange={setDays} days={days} />
      </div>
      <div className="songs-carousel">
        {loading ? <Loader /> : <AuthorPictureListCarousel songs={songs} />}
      </div>
    </section>
  );
}

TopSongs.propTypes = {
  count: PropTypes.number,
  loading: PropTypes.bool,
  songs: PropTypes.array,
  onLoadTopSongs: PropTypes.func,
};

TopSongs.contextTypes = {
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  songs: makeSelectTopSongs(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTopSongs: (days, count) => dispatch(loadTopSongs(days, count)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TopSongs);
