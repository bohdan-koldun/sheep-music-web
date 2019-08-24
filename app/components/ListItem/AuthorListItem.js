import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthorImg } from 'components/Img';
import './AuthorListItem.scss';

function AuthorListItem({ author }) {
  return (
    <div className="song-author-item">
      <AuthorImg author={author} className="author-img" />
      <div>
        <Link to={`/author/${author.slug}`}>{author.title}</Link>
        <br />
        <span>
          Автор {author.year && ` • ${author.year}`} {' • '} {author.songs || 0}{' '}
          композиции
        </span>
      </div>
    </div>
  );
}

AuthorListItem.propTypes = {
  author: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default AuthorListItem;
