import { defineMessages } from 'react-intl';

export const scope = 'app.components.Player';

export default defineMessages({
  play: {
    id: `${scope}.play`,
    defaultMessage: 'воспроизвести',
  },
  pause: {
    id: `${scope}.pause`,
    defaultMessage: 'остановить',
  },
  volumeOff: {
    id: `${scope}.volumeOff`,
    defaultMessage: 'отключить звук',
  },
  volumeOn: {
    id: `${scope}.volumeOn`,
    defaultMessage: 'включить звук',
  },
  shuffle: {
    id: `${scope}.shuffle`,
    defaultMessage: 'перемешать',
  },
  loop: {
    id: `${scope}.loop`,
    defaultMessage: 'зациклить',
  },
  download: {
    id: `${scope}.download`,
    defaultMessage: 'скачать',
  },
  list: {
    id: `${scope}.list`,
    defaultMessage: 'список',
  },
  prev: {
    id: `${scope}.prev`,
    defaultMessage: 'предыдущий трек',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'следующий трек',
  },
});
