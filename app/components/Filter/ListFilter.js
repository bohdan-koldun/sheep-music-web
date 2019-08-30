import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { MdSearch } from 'react-icons/md';
import Select from 'react-select';
import { useIntl } from 'containers/LanguageProvider';
import SelectIcon from './SelectIcon';
import messages from './messages';
import './ListFilter.scss';

function ListFilter({ search, filter, onChangeSearch, onChangeFilter }) {
  const intl = useIntl();
  const options = [
    { value: 'newest', label: intl.formatMessage(messages.newest) },
    { value: 'alphabet', label: intl.formatMessage(messages.alphabet) },
    {
      value: 'revert_alphabet',
      label: intl.formatMessage(messages.revertAlphabet),
    },
  ];

  const filterValue = options.find(option => option.value === filter.value);

  return (
    <div className="filter">
      <div className="search-block">
        <MdSearch />
        <DebounceInput
          value={search}
          minLength={2}
          placeholder={intl.formatMessage(messages.search)}
          debounceTimeout={400}
          onChange={event => onChangeSearch(event.target.value)}
          className="search-input"
        />
      </div>
      <div className="sort-block">
        <SelectIcon filter={filter.value} />
        <Select
          value={filterValue}
          onChange={onChangeFilter}
          options={options}
          className="sort-select"
        />
      </div>
    </div>
  );
}

ListFilter.propTypes = {
  search: PropTypes.string,
  filter: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  onChangeSearch: PropTypes.func,
  onChangeFilter: PropTypes.func,
};

ListFilter.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default ListFilter;
