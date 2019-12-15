import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'containers/LanguageProvider';
import Breadcrumb from 'components/Breadcrumb';
import menuMessages from 'components/Menu/messages';
import WaitSheep from 'components/WaitSheep';

export function Notebook() {
  const intl = useIntl();

  return (
    <React.Fragment>
      <Breadcrumb
        pageList={[
          {
            link: '/notebook',
            name: intl.formatMessage(menuMessages.notebook),
          },
        ]}
      />
      <div className="notebook-page">
        <WaitSheep message="Очень хотим реализовать эту страницу. Как только будет время - с Божьей помощью сделаем!" />
      </div>
      <div className="email">
        Пишите:{'  '}
        <a href="mailto:sheep.music.com@gmail.com">sheep.music.com@gmail.com</a>
      </div>
    </React.Fragment>
  );
}

const withConnect = connect();

export default compose(withConnect)(Notebook);
