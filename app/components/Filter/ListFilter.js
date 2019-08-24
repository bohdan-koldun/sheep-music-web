import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { MdSearch, MdFilterList } from 'react-icons/md';
import Select from 'react-select';

import './ListFilter.scss';

const options = [
  { value: 'newest', label: 'Новые' },
  { value: 'alphabet', label: 'По алфавиту' },
  { value: 'revert_alphabet', label: 'Против алфавита' },
];

function ListFilter({ search, filter, onChangeSearch, onChangeFilter }) {
  return (
    <div className="filter">
      <MdSearch />
      <DebounceInput
        value={search}
        minLength={2}
        placeholder="Поиск"
        debounceTimeout={400}
        onChange={event => onChangeSearch(event.target.value)}
      />
      <MdFilterList />
      <Select
        value={filter}
        onChange={onChangeFilter}
        options={options}
        className="sort-select"
      />
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

export default ListFilter;
