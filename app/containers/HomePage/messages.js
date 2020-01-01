import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  startProjectHeader: {
    id: `${scope}.start_project.header`,
    defaultMessage: 'Сайт-агрегатор христианской музыки',
  },
  startProjectMessage: {
    id: `${scope}.start_project.message`,
    defaultMessage: 'Аудио, тексты, аккорды, авторы, альбомы',
  },
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
