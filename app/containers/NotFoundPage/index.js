import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import H1 from 'components/H1';
import messages from './messages';
import SheepGuiar from './sheep_play_guitar.gif';

export default function NotFound() {
  return (
    <article style={{ textAlign: 'center' }}>
      <Helmet>
        <title>Страница не найдена</title>
        <meta
          name="description"
          content="Христианские песни: слушать онлайн, скачать, слова, текст, аккорды, фонограммы"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <img src={SheepGuiar} alt="shep music" />
    </article>
  );
}
