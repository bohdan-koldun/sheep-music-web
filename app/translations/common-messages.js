import { defineMessages } from 'react-intl';

export const scope = 'app.common';

export default defineMessages({
  author: {
    id: `${scope}.author`,
    defaultMessage: 'Автор',
  },
  album: {
    id: `${scope}.album`,
    defaultMessage: 'Альбом',
  },
  oneSong: {
    id: `${scope}.oneSong`,
    defaultMessage: 'песня',
  },
  manySongFirstVariant: {
    id: `${scope}.manySongFirstVariant`,
    defaultMessage: 'песни',
  },
  manySongSecondVariant: {
    id: `${scope}.manySongSecondVariant`,
    defaultMessage: 'песен',
  },
  manySongThirdVariant: {
    id: `${scope}.manySongThirdVariant`,
    defaultMessage: 'песеня',
  },
});
