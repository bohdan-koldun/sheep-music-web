import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useIntl } from 'containers/LanguageProvider';
import {
  makeSelectTags,
  makeSelectGlobalLoading,
} from 'containers/App/selectors';
import Breadcrumb from 'components/Breadcrumb';
import { TagList } from 'components/List';
import menuMessages from 'components/Menu/messages';
import commonMessage from 'translations/common-messages';
import './TagList.scss';

export function TagListPage({ tags, loading }) {
  const intl = useIntl();

  return (
    <div>
      <Helmet>
        <title>Христианские песни по тематикам и жанрам</title>
        <meta
          name="description"
          content="Христианские по сортирование по темам[рождественские, пасхальные и так далее] и жанрам[госпел, кантри, рок и так далее]"
        />
      </Helmet>

      <Breadcrumb
        pageList={[
          {
            link: '/topics',
            name: intl.formatMessage(menuMessages.topics),
          },
        ]}
      />

      <h1>{intl.formatMessage(commonMessage.themesAndGenres)}</h1>
      <TagList tags={tags} loading={loading} />
    </div>
  );
}

TagListPage.propTypes = {
  loading: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = createStructuredSelector({
  tags: makeSelectTags(),
  loading: makeSelectGlobalLoading(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(TagListPage);
