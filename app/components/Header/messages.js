import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  songs: {
    id: `${scope}.songs`,
    defaultMessage: 'Песни',
  },
  albums: {
    id: `${scope}.albums`,
    defaultMessage: 'Альбомы',
  },
  authors: {
    id: `${scope}.authors`,
    defaultMessage: 'Исполнители',
  },
});
