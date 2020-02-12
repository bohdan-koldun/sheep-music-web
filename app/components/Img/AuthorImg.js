import React from 'react';
import PropTypes from 'prop-types';
import DefaultImg from './author_thumb.png';

function AuthorImg({ className, author }) {
  const authorImg = author && author.thumbnail && author.thumbnail.path;

  return (
    <img
      className={className}
      src={authorImg || DefaultImg}
      alt={author && author.title}
    />
  );
}

// We require the use of src and alt, only enforced by react in dev mode
AuthorImg.propTypes = {
  className: PropTypes.string,
  author: PropTypes.object,
};

export default AuthorImg;
