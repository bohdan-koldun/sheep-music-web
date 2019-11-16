import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'containers/LanguageProvider';
import Breadcrumb from 'components/Breadcrumb';
import menuMessages from 'components/Menu/messages';
import WaitSheep from 'components/WaitSheep';

export function Favorites() {
  const intl = useIntl();

  return (
    <React.Fragment>
      <Breadcrumb
        pageList={[
          {
            link: '/favorites',
            name: intl.formatMessage(menuMessages.favorites),
          },
        ]}
      />
      <div className="favorites-page">
        <WaitSheep message="Эта функция будет реализована в ближайшее время. Вы сможете создавать списки своих любимых песен." />
      </div>
    </React.Fragment>
  );
}

const withConnect = connect();

export default compose(withConnect)(Favorites);
