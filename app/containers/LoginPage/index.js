import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useIntl } from 'containers/LanguageProvider';
import BeatLoader from 'react-spinners/BeatLoader';
import commonMessages from 'translations/common-messages';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectUser,
} from './selectors';
import { login } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './LoginPage.scss';

export function LoginPage({ onLogin, loading, error, user }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const intl = useIntl();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-page">
      {loading ? (
        <BeatLoader />
      ) : (
        (!user && (
          <div className="login-form">
            <FormattedMessage {...messages.header} />
            <input
              name="email"
              type="email"
              placeholder={intl.formatMessage(messages.email)}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              name="password"
              type="password"
              value={password}
              placeholder={intl.formatMessage(messages.password)}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => onLogin(email, password)}>
              {intl.formatMessage(messages.login)}
            </button>
            {error && (
              <div className="login-error">
                {intl.formatMessage(messages.error)}
              </div>
            )}
          </div>
        )) || (
          <div className="user">
            {' '}
            {intl.formatMessage(commonMessages.hello)}, {user.name}!
          </div>
        )
      )}
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (email, password) => dispatch(login(email, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
