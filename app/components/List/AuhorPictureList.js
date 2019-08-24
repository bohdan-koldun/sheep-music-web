import React from 'react';
import PropTypes from 'prop-types';
import { AuthorListItem } from 'components/ListItem';
import './AuhorPictureList.scss';

function AuhorPictureList({ authors }) {
  return authors ? (
    <div className="author-list">
      {authors.map(author => (
        <AuthorListItem key={author.slug} author={author} />
      ))}
    </div>
  ) : null;
}

AuhorPictureList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
};

export default AuhorPictureList;
