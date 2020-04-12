import { defineMessages } from 'react-intl';

export const scope = 'app.components.Filter';

export default defineMessages({
  newest: {
    id: `${scope}.newest`,
    defaultMessage: 'Новые',
  },
  alphabet: {
    id: `${scope}.alphabet`,
    defaultMessage: 'По алфавиту',
  },
  popular: {
    id: `${scope}.popular`,
    defaultMessage: 'Популярные',
  },
  revertAlphabet: {
    id: `${scope}.alphabet.revert`,
    defaultMessage: 'Обратно алфавиту',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Поиск',
  },
  theme: {
    id: `${scope}.theme`,
    defaultMessage: 'Тематика...',
  },
  sorting: {
    id: `${scope}.sorting`,
    defaultMessage: 'Сортировка...',
  },
  day: {
    id: `${scope}.day`,
    defaultMessage: 'сутки',
  },
  week: {
    id: `${scope}.week`,
    defineMessages: 'неделя',
  },
  month: {
    id: `${scope}.month`,
    defineMessages: 'месяц',
  },
  quarter: {
    id: `${scope}.quarter`,
    defineMessages: 'квартал',
  },
  year: {
    id: `${scope}.year`,
    defineMessages: 'год',
  },
  allTime: {
    id: `${scope}.allTime`,
    defineMessages: 'все время',
  },
});
