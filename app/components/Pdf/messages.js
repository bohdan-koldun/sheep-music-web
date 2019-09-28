import { defineMessages } from 'react-intl';

export const scope = 'app.components.Pdf';

export default defineMessages({
  downloadPdf: {
    id: `${scope}.downloadPdf`,
    defaultMessage: 'Скачать PDF',
  },
  generatePdf: {
    id: `${scope}.generatePdf`,
    defaultMessage: 'Сгенерировать PDF',
  },
});
