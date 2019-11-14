import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import ReactTooltip from 'react-tooltip';
import { MdBookmark, MdViewList, MdViewModule } from 'react-icons/md';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useIntl } from 'containers/LanguageProvider';
import { makeSelectTags } from 'containers/App/selectors';
import { SongsMessage } from 'components/Message';
import messages from './messages';
import './TagList.scss';

export function TagList({ tags }) {
  const intl = useIntl();

  const [listType, setListType] = useState(1);

  return (
    <div>
      <Helmet>
        <title>Христианские песни по тематикам и жанрам</title>
        <meta
          name="description"
          content="Христианские посортирование по темам: рождественские, пасхальные и так далие"
        />
      </Helmet>
      <h1>{intl.formatMessage(messages.header)}</h1>
      <div className="list-type-switch">
        <button
          type="button"
          className="type-list-button"
          onClick={() => setListType(1)}
        >
          <MdViewList
            className={classNames('type-list-icon', {
              'type-list-icon-active': listType === 1,
            })}
          />
        </button>
        <button
          type="button"
          className="type-list-button"
          onClick={() => setListType(2)}
        >
          <MdViewModule
            className={classNames('type-list-icon', {
              'type-list-icon-active': listType === 2,
            })}
          />
        </button>
      </div>
      <div
        className={classNames('tags-page-list', {
          'tags-page-list-column': listType === 1,
          'tags-page-list-module': listType === 2,
        })}
      >
        {tags.map(tag => (
          <Link
            to={`/songs?filter=newest&tags=${tag.id}`}
            key={tag.id}
            data-tip
            data-for={tag.name}
          >
            <span>
              <MdBookmark />
              {tag.name}
            </span>
            <span className="tag-songs-count">{tag.songsCount}</span>
            <ReactTooltip id={tag.name} place="top" type="dark" ffect="float">
              {tag.name}: {tag.songsCount}{' '}
              <SongsMessage count={tag.songsCount || 0} />
            </ReactTooltip>
          </Link>
        ))}
      </div>
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = createStructuredSelector({
  tags: makeSelectTags(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(TagList);