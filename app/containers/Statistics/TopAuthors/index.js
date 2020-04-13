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
  makeSelectTopAuthors,
} from './selectors';
import messages from '../messages';
import { loadTopAuthors } from './actions';
import reducer from './reducer';
import saga from './saga';
import './TopAuthors.scss';

export function TopAuthors({ onLoadTopAuthors, authors, loading, count = 10 }) {
  useInjectReducer({ key: 'topAuthorsState', reducer });
  useInjectSaga({ key: 'topAuthorsState', saga });

  const intl = useIntl();

  const [days, setDays] = useState(7);

  useEffect(() => {
    onLoadTopAuthors(days, count);
  }, [days]);

  return (
    <section className="top-authors">
      <h2>
        <AiTwotoneFire />
        {intl.formatMessage(messages.popularAuthors).toLowerCase()}
      </h2>
      <hr />
      <div>
        <DaysFilter onChange={setDays} days={days} />
      </div>
      <div className="authors-carousel">
        {loading ? (
          <Loader marginTop="0" />
        ) : (
          <AuthorPictureListCarousel authors={authors} />
        )}
      </div>
    </section>
  );
}

TopAuthors.propTypes = {
  count: PropTypes.number,
  loading: PropTypes.bool,
  authors: PropTypes.array,
  onLoadTopAuthors: PropTypes.func,
};

TopAuthors.contextTypes = {
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  authors: makeSelectTopAuthors(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTopAuthors: (days, count) => dispatch(loadTopAuthors(days, count)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TopAuthors);
