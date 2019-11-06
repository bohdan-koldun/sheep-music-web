/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import checkUserPermissions from 'utils/checkPermissions';
import * as striptags from 'striptags';
import Select from 'react-select';
import BeatLoader from 'react-spinners/BeatLoader';
import { makeSelectUser } from 'containers/App/selectors';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumData,
  makeSelectAuthorsData,
} from './selectors';
import { loadAlbum, editAlbum, loadAuthorIds } from './actions';
import reducer from './reducer';
import saga from './saga';
import './EditAlbum.scss';

export function EditAlbum({
  onLoadAlbum,
  album,
  authors,
  user,
  error,
  match,
  loading,
  onEditAlbum,
  onLoadAuthorIds,
}) {
  useInjectReducer({ key: 'editAlbum', reducer });
  useInjectSaga({ key: 'editAlbum', saga });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState(null);
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

  useEffect(() => {
    onLoadAlbum(match.params.slug);
    onLoadAuthorIds();
  }, []);

  useEffect(() => {
    if (album) {
      setTitle(album.title || '');
      setDescription(striptags(album.description || ''));
      setYear(album.year || '');
      setAuthor(
        album.author && { label: album.author.title, value: album.author.id },
      );
    }
  }, [album]);

  return (
    <div className="edit-album-page">
      {loading ? (
        <BeatLoader size={31} margin="20px" />
      ) : (
        (checkUserPermissions(user, ['admin', 'moderator']) && (
          <form>
            <label
              style={{
                color: '#009688',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              {album.parsedSource}
            </label>

            <label>
              Название альбома:
              <input
                type="text"
                name="title"
                className="album-input"
                placeholder="Имя автора"
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
                options={
                  authors &&
                  authors.map(item => ({ value: item.id, label: item.title }))
                }
                isSearchable
                className="album-author-select"
                placeholder="автор альбома"
              />
            </label>
            <label>
              Аватарка должна быть квадратной. Ширина равняется высоте и &gt;=
              600px!
              <input
                type="file"
                name="avatar"
                className="upload-album-avatar"
                accept="image/*"
                onChange={handleImageChange}
              />
              <img
                src={
                  imagePreviewUrl || (album.thumbnail && album.thumbnail.path)
                }
                className="album-edit-img"
                alt=""
              />
            </label>
            <button
              type="button"
              className="save-button"
              onClick={() => {
                onEditAlbum({
                  title,
                  id: album.id,
                  description,
                  year,
                  avatar,
                  author: author && author.value,
                });
              }}
            >
              Сохранить
            </button>
            {error && <p className="error-label">Ошибка сохранения!</p>}
          </form>
        )) ||
        (user && <p className="error-label">У вас нет прав!</p>)
      )}
    </div>
  );
}

EditAlbum.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  album: PropTypes.object,
  onLoadAlbum: PropTypes.func,
  onEditAlbum: PropTypes.func,
  onLoadAuthorIds: PropTypes.func,
  user: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
  authors: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  album: makeSelectAlbumData(),
  user: makeSelectUser(),
  authors: makeSelectAuthorsData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadAlbum: slug => dispatch(loadAlbum(slug)),
    onLoadAuthorIds: () => dispatch(loadAuthorIds()),
    onEditAlbum: album => dispatch(editAlbum(album)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditAlbum);
