/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import * as striptags from 'striptags';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import './AuthorForm.scss';

function AuthorForm({ author = {}, outsideError, onSubmit, onWillUnmount }) {
  useInjectReducer({ key: 'form', reducer });
  useInjectSaga({ key: 'form', saga });

  const [title, setTitle] = useState(author.title || '');
  const [description, setDescription] = useState(
    striptags(author.description || ''),
  );
  const [avatar, setAvatar] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleImageChange = event => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      setAvatar(file);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const avatarUrl =
    imagePreviewUrl || (author.thumbnail && author.thumbnail.path);

  const getAuthorState = () => ({
    title,
    description,
    avatar,
  });

  useEffect(() => {
    if (onWillUnmount) {
      onWillUnmount(getAuthorState());
    }
  }, [title, description]);

  return (
    <form className="author-form">
      <label
        style={{
          color: '#009688',
          display: 'block',
          marginBottom: '10px',
        }}
      >
        {author.parsedSource}
      </label>

      <label>
        Имя исполнителя:
        <input
          type="text"
          name="title"
          className="author-input"
          placeholder="Имя исполнителя"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <label>
        Описание автора:
        <textarea
          name="text"
          rows="15"
          className="author-input"
          placeholder="Описание исполнителя"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <label>
        Аватарка должна быть квадратной. Ширина равняется высоте и &gt;= 400px!
        <br />
        <input
          type="file"
          name="avatar"
          className="upload-avatar-input"
          accept="image/*"
          onChange={handleImageChange}
        />
        {avatarUrl && (
          <img src={avatarUrl} className="author-edit-img" alt="" />
        )}
      </label>
      <button
        type="button"
        className="save-button"
        onClick={() => {
          onSubmit(getAuthorState());
        }}
      >
        Сохранить
      </button>
      {outsideError && (
        <p className="error-label">
          Ошибка сохранения! {outsideError && outsideError.message}
        </p>
      )}
    </form>
  );
}

AuthorForm.propTypes = {
  author: PropTypes.object,
  onSubmit: PropTypes.func,
  onWillUnmount: PropTypes.func,
  outsideError: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(AuthorForm);
