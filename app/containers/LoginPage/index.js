import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useIntl } from 'containers/LanguageProvider';
import BeatLoader from 'react-spinners/BeatLoader';
import { MdTrendingUp } from 'react-icons/md';
import Breadcrumb from 'components/Breadcrumb';
import menuMessages from 'components/Menu/messages';
import commonMessages from 'translations/common-messages';
import { makeSelectUser } from 'containers/App/selectors';
import { logout } from 'containers/App/actions';
import checkUserPermissions from 'utils/checkPermissions';
import { makeSelectLoading, makeSelectError } from './selectors';
import { login } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './LoginPage.scss';

export function LoginPage({ onLogin, onLogout, loading, error, user }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const intl = useIntl();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <React.Fragment>
      <Breadcrumb
        pageList={[
          {
            link: '/login',
            name: intl.formatMessage(menuMessages.login),
          },
        ]}
      />
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
                {intl.formatMessage(commonMessages.login)}
              </button>
              {error && (
                <div className="login-error">
                  {intl.formatMessage(messages.error)}
                </div>
              )}
            </div>
          )) || (
            <div className="user">
              <p>
                {' '}
                {intl.formatMessage(commonMessages.hello)}, {user.name}!
              </p>
              <button type="button" onClick={() => onLogout()}>
                {intl.formatMessage(commonMessages.logout)}
              </button>
              {checkUserPermissions(user, ['admin', 'moderator']) && (
                <Link
                  to="/moderator/statistic"
                  className="moderator-statistic-link"
                >
                  <span>Статистика модераторов</span>
                  <MdTrendingUp />
                </Link>
              )}
            </div>
          )
        )}
      </div>
    </React.Fragment>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func,
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
    onLogout: () => dispatch(logout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
