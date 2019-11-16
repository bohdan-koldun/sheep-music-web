import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Select from 'react-select';

import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import './LocaleToggle.scss';

export function LocaleToggle({ locale, onLocaleToggle }) {
  const options = appLocales.map(language => ({
    value: language,
    label: language,
  }));

  return (
    <div className="locale-toggle">
      <Select
        value={{ value: locale, label: locale }}
        onChange={onLocaleToggle}
        options={options}
        isSearchable={false}
        className="locale-select"
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
    onLocaleToggle: option => dispatch(changeLocale(option && option.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
