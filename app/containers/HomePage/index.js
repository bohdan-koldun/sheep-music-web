import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import WaitSheep from 'components/WaitSheep';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectStatisticData,
} from './selectors';
import messages from './messages';
import { loadStatistic } from './actions';
import reducer from './reducer';
import saga from './saga';

export function HomePage({ onLoadStatistic, statisticData }) {
  useInjectReducer({ key: 'statisticHome', reducer });
  useInjectSaga({ key: 'statisticHome', saga });

  useEffect(() => {
    onLoadStatistic();
  }, []);

  return (
    <article>
      <Helmet>
        <title>Сайт-Агрегатор Христианской Музыки</title>
        <meta
          name="description"
          content="Sheep Music: слушать онлайн, скачать mp3, слова, текст, аккорды, фонограммы"
        />
        <link rel="canonical" href="https://sheep-music.com/album/" />
      </Helmet>
      <div>
        <h2>
          <FormattedMessage {...messages.startProjectHeader} />
        </h2>
        <p>
          <FormattedMessage {...messages.startProjectMessage} />
          {JSON.stringify(statisticData)}
        </p>
        <WaitSheep message="Здесь скоро появится интересная статистика о песнях! И многое другое!" />
        <div className="email">
          Пишите:{'  '}
          <a href="mailto:sheep.music.com@gmail.com">
            sheep.music.com@gmail.com
          </a>
        </div>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  statisticData: PropTypes.object,
  onLoadStatistic: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  statisticData: makeSelectStatisticData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadStatistic: () => dispatch(loadStatistic()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
