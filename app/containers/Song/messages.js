/*
 * Song Messages
 *
 * This contains all the text for the Song container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Song';

export default defineMessages({
  author: {
    id: `${scope}.author`,
    defaultMessage: 'Автор',
  },
  album: {
    id: `${scope}.album`,
    defaultMessage: 'Альбом',
  },
});
