import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { MdLanguage } from 'react-icons/md';

import Toggle from 'components/Toggle';
import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import './LocaleToggle.scss';

export function LocaleToggle(props) {
  return (
    <div className="locale-toggle">
      <MdLanguage />
      <Toggle
        value={props.locale}
        values={appLocales}
        messages={messages}
        onToggle={props.onLocaleToggle}
      />
    </div>
  );
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
