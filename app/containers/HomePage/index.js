import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { Helmet } from 'react-helmet';
import TopAlbums from 'containers/Statistics/TopAlbums';
import TopAuthors from 'containers/Statistics/TopAuthors';
import Breadcrumb from 'components/Breadcrumb';

export function HomePage() {
  const canonicalUrl = 'https://sheep-music.com';
  const title = 'Сайт-Агрегатор Христианской Музыки | Sheep Music';
  const description =
    'Sheep Music: слушать онлайн, скачать mp3, слова, текст, аккорды, фонограммы';

  return (
    <article>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Sheep Music" />
        <meta property="og:description" content={description} />
      </Helmet>
      <JsonLd
        item={{
          '@context': 'http://schema.org',
          '@type': 'Organization',
          name: 'Sheep Music',
          url: canonicalUrl,
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'sheep.music.com@gmail.com',
            },
          ],
        }}
      />
      <Breadcrumb />
      <section>
        <TopAlbums count={15} />
        <TopAuthors count={15} />
      </section>
    </article>
  );
}

export default HomePage;
