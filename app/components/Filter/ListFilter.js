import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { MdSearch } from 'react-icons/md';
import Select from 'react-select';
import { useIntl } from 'containers/LanguageProvider';
import { FaTags } from 'react-icons/fa';
import SelectIcon from './SelectIcon';
import messages from './messages';
import './ListFilter.scss';

function ListFilter({
  search,
  filter,
  onChangeSearch,
  onChangeFilter,
  onChangeTagsFilter,
  tags,
  curTags,
}) {
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

  const tagOptions =
    tags && tags.map(tag => ({ value: tag.id, label: tag.name }));

  const curTagsArr =
    curTags && curTags.split(',').map(tagId => Number.parseInt(tagId, 10));

  const tagValues =
    tagOptions &&
    tagOptions.filter(tag => curTagsArr && curTagsArr.includes(tag.value));

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
          isSearchable={false}
          className="sort-select"
        />
      </div>
      {tagOptions && tagOptions.length > 0 && (
        <div className="tags-block">
          <FaTags />
          <Select
            value={tagValues}
            onChange={onChangeTagsFilter}
            options={tagOptions}
            isMulti
            isSearchable={false}
            className="tags-select"
          />
        </div>
      )}
    </div>
  );
}

ListFilter.propTypes = {
  search: PropTypes.string,
  filter: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  tags: PropTypes.arrayOf(PropTypes.object),
  curTags: PropTypes.string,
  onChangeSearch: PropTypes.func,
  onChangeFilter: PropTypes.func,
  onChangeTagsFilter: PropTypes.func,
};

ListFilter.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default ListFilter;
