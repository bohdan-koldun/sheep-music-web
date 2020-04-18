import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import messages from './messages';

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
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <img
        src="https://sheep.fra1.digitaloceanspaces.com/wait-sheep/sheep-wait-10.gif"
        alt="shep music"
      />
    </article>
  );
}
