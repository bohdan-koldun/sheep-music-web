import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Filter';

export default defineMessages({
  newest: {
    id: `${scope}.newest`,
    defaultMessage: 'Новые',
  },
  alphabet: {
    id: `${scope}.alphabet`,
    defaultMessage: 'По алфавиту',
  },
  revertAlphabet: {
    id: `${scope}.alphabet.revert`,
    defaultMessage: 'Обратно алфавиту',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Поиск',
  },
});