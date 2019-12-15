import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import WaitSheep from 'components/WaitSheep';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import messages from './messages';
import { changeUsername } from './actions';

export function HomePage() {
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
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
