/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Pagination';

export default defineMessages({
  previous: {
    id: `${scope}.previous`,
    defaultMessage: 'вперёд',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'назад',
  },
});
