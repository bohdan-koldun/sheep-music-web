import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useIntl } from 'containers/LanguageProvider';
import messages from './messages';
import './DaysFilter.scss';

function DaysFilter({ onChange, days }) {
  const intl = useIntl();

  return (
    <div className="days-filter">
      <button
        type="button"
        className={classNames({ active: days === 1 })}
        onClick={() => onChange(1)}
      >
        {intl.formatMessage(messages.day)}
      </button>
      <button
        type="button"
        className={classNames({ active: days === 7 })}
        onClick={() => onChange(7)}
      >
        {intl.formatMessage(messages.week)}
      </button>
      <button
        type="button"
        className={classNames({ active: days === 30 })}
        onClick={() => onChange(30)}
      >
        {intl.formatMessage(messages.month)}
      </button>
      <button
        type="button"
        className={classNames({ active: days === 90 })}
        onClick={() => onChange(90)}
      >
        {intl.formatMessage(messages.quarter)}
      </button>
      <button
        type="button"
        className={classNames({ active: days === 365 })}
        onClick={() => onChange(365)}
      >
        {intl.formatMessage(messages.year)}
      </button>
      <button
        type="button"
        className={classNames({ active: days === 3 * 365 })}
        onClick={() => onChange(3 * 365)}
      >
        {intl.formatMessage(messages.allTime)}
      </button>
    </div>
  );
}

DaysFilter.propTypes = {
  onChange: PropTypes.func,
  days: PropTypes.number,
};

DaysFilter.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default DaysFilter;
