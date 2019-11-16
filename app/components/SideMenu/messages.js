import { defineMessages } from 'react-intl';

export const scope = 'app.components.SideMenu';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  songs: {
    id: `${scope}.songs`,
    defaultMessage: 'Музыка',
  },
  topics: {
    id: `${scope}.topics`,
    defaultMessage: 'По темам',
  },
  albums: {
    id: `${scope}.albums`,
    defaultMessage: 'Альбомы',
  },
  authors: {
    id: `${scope}.authors`,
    defaultMessage: 'Исполнители',
  },
  videos: {
    id: `${scope}.videos`,
    defaultMessage: 'Клипы',
  },
  favorites: {
    id: `${scope}.favorites`,
    defaultMessage: 'Избранное',
  },
  notebook: {
    id: `${scope}.notebook`,
    defaultMessage: 'Блокнот',
  },
});
