/*
 * SongList Messages
 *
 * This contains all the text for the SongList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SongList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SongList container!',
  },
});
