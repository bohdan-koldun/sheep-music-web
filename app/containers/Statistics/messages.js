import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Statistics';

export default defineMessages({
  popularAlbums: {
    id: `${scope}.popularAlbums`,
    defaultMessage: 'Популярные альбомы',
  },
  popularAuthors: {
    id: `${scope}.popularAuthors`,
    defaultMessage: 'Популярные авторы',
  },
  popularSongs: {
    id: `${scope}.popularSongs`,
    defaultMessage: 'Популярные песни',
  },
});
