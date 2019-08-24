import React from 'react';
import PropTypes from 'prop-types';

import {
  MdFilterList,
  MdFiberNew,
  MdArrowDownward,
  MdArrowUpward,
} from 'react-icons/md';

function SelectIcon({ filter }) {
  switch (filter) {
    case 'newest':
      return <MdFiberNew />;
    case 'alphabet':
      return <MdArrowDownward />;
    case 'revert_alphabet':
      return <MdArrowUpward />;
    default:
      return <MdFilterList />;
  }
}

SelectIcon.propTypes = {
  filter: PropTypes.string,
};
export default SelectIcon;
