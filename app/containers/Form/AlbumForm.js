/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import * as striptags from 'striptags';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { makeSelectAuthorsIds, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import './AlbumForm.scss';
import { loadAuthorIds } from './actions';

function AlbumForm({
  album = {},
  outsideError,
  onSubmit,
  authors = [],
  onWillUnmount,
  onLoadAuthorsIds,
}) {
  useInjectReducer({ key: 'form', reducer });
  useInjectSaga({ key: 'form', saga });

  const [title, setTitle] = useState(album.title || '');
  const [year, setYear] = useState(album.year || '');
  const [description, setDescription] = useState(
    striptags(album.description || ''),
  );
  const [author, setAuthor] = useState(
    album.author && {
      value: album.author.id,
      label: album.author.title,
    },
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
    imagePreviewUrl || (album.thumbnail && album.thumbnail.path);

  const authorsOptions = authors.map(item => ({
    value: item.id,
    label: item.title,
  }));

  const getAuthorState = () => ({
    title,
    year,
    description,
    avatar,
  });

  useEffect(() => {
    if (onWillUnmount) {
      onWillUnmount(getAuthorState());
    }
  }, [title, description]);

  return (
    <form className="album-form">
      <label className="source-label">{album.parsedSource}</label>

      <label>
        Название альбома:
        <input
          type="text"
          name="title"
          className="album-input"
          placeholder="Имя альбома"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <label>
        Год:
        <input
          type="number"
          name="year"
          className="album-input"
          placeholder="Год"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
      </label>
      <label>
        Описание альбома:
        <textarea
          name="text"
          rows="15"
          className="album-input"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <label>
        Автор альбома:
        <Select
          value={author}
          onChange={value => setAuthor(value)}
          options={authorsOptions}
          onMenuOpen={() => {
            if (!authors.length) {
              onLoadAuthorsIds();
            }
          }}
          isSearchable
          className="album-select"
          placeholder="автор альбома"
        />
      </label>
      <label>
        Аватарка должна быть квадратной. Ширина равняется высоте и &gt;= 400px!
        <input
          type="file"
          name="avatar"
          className="upload-avatar-input"
          accept="image/*"
          onChange={handleImageChange}
        />
        {avatarUrl && <img src={avatarUrl} className="album-edit-img" alt="" />}
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
        <p className="error-label">Ошибка сохранения! {outsideError.message}</p>
      )}
    </form>
  );
}

AlbumForm.propTypes = {
  album: PropTypes.object,
  onSubmit: PropTypes.func,
  onWillUnmount: PropTypes.func,
  onLoadAuthorsIds: PropTypes.func,
  outsideError: PropTypes.any,
  authors: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  authors: makeSelectAuthorsIds(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadAuthorsIds: albumId => dispatch(loadAuthorIds(albumId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AlbumForm);
