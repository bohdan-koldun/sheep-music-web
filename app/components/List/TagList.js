/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import ReactTooltip from 'react-tooltip';
import { MdViewList, MdViewModule } from 'react-icons/md';
import { AiFillTag } from 'react-icons/ai';
import { SongsMessage } from 'components/Message';
import Loader from 'components/Loader';
import './TagList.scss';

export function TagList({ tags, loading }) {
  const [listType, setListType] = useState(2);

  return (
    <section>
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
        className={classNames('tags-list', {
          'tags-list-column': listType === 1,
          'tags-list-module': listType === 2,
        })}
      >
        {!loading
          ? tags.map(tag => (
              <Link
                to={`/songs?filter=newest&tags=${tag.id}`}
                key={tag.id}
                data-tip
                data-for={tag.name}
              >
                <span>
                  <AiFillTag />
                  {tag.name}
                </span>
                <span className="tag-songs-count">{tag.songsCount}</span>
                <ReactTooltip
                  id={tag.name}
                  place="top"
                  type="dark"
                  ffect="float"
                >
                  {tag.name}: {tag.songsCount}{' '}
                  <SongsMessage count={tag.songsCount || 0} />
                </ReactTooltip>
              </Link>
            ))
          : (loading && <Loader />) || null}
      </div>
    </section>
  );
}

TagList.propTypes = {
  loading: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.object),
};

export default TagList;
