import React from 'react';
import PropTypes from 'prop-types';

// import { useIntl } from 'containers/LanguageProvider';
// import messages from './messages';
import './DaysFilter.scss';

function DaysFilter({ onChange }) {
  // const intl = useIntl();

  return (
    <div className="days-filter">
      <button type="button" onClick={() => onChange(1)}>
        день
      </button>
      <button type="button" onClick={() => onChange(7)}>
        неделя
      </button>
      <button type="button" onClick={() => onChange(30)}>
        месяц
      </button>
      <button type="button" onClick={() => onChange(365)}>
        год
      </button>
      <button type="button" onClick={() => onChange(3 * 365)}>
        все время
      </button>
    </div>
  );
}

DaysFilter.propTypes = {
  onChange: PropTypes.func,
};

DaysFilter.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default DaysFilter;
