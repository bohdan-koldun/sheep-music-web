import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider, injectIntl } from 'react-intl';

import { makeSelectLocale } from './selectors';

const ReactIntlContext = React.createContext(null);

const IntlContextProvider = injectIntl(({ intl, children }) => (
  <ReactIntlContext.Provider value={intl}>{children}</ReactIntlContext.Provider>
));

export const useIntl = () => React.useContext(ReactIntlContext);

export function LanguageProvider(props) {
  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale]}
    >
      <IntlContextProvider>
        {React.Children.only(props.children)}
      </IntlContextProvider>
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export default connect(mapStateToProps)(LanguageProvider);
