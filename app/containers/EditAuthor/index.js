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
import BeatLoader from 'react-spinners/BeatLoader';
import { makeSelectUser } from 'containers/App/selectors';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorData,
} from './selectors';
import { loadAuthor, editAuthor } from './actions';
import reducer from './reducer';
import saga from './saga';
import './EditAuthor.scss';

export function EditAuthor({
  onLoadAuthor,
  author,
  user,
  error,
  match,
  loading,
  onEditAuthor,
}) {
  useInjectReducer({ key: 'editAuthor', reducer });
  useInjectSaga({ key: 'editAuthor', saga });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
    onLoadAuthor(match.params.slug);
  }, []);

  useEffect(() => {
    if (author) {
      setTitle(author.title || '');
      setDescription(striptags(author.description || ''));
    }
  }, [author]);

  return (
    <div className="edit-author-page">
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
              {author.parsedSource}
            </label>

            <label>
              Имя автора:
              <input
                type="text"
                name="title"
                className="author-input"
                placeholder="Имя автора"
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
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </label>
            <label>
              Аватарка должна быть квадратной. Ширина равняется высоте и &gt;=
              600px!
              <input
                type="file"
                name="avatar"
                className="upload-author-avatar"
                accept="image/*"
                onChange={handleImageChange}
              />
              <img
                src={
                  imagePreviewUrl || (author.thumbnail && author.thumbnail.path)
                }
                className="author-edit-img"
                alt=""
              />
            </label>
            <button
              type="button"
              className="save-button"
              onClick={() => {
                onEditAuthor({
                  title,
                  id: author.id,
                  slug: author.slug,
                  description,
                  avatar,
                });
              }}
            >
              Сохранить
            </button>
            {error && <p className="error-label">Ошибка сохранения!</p>}
          </form>
        )) || <p className="error-label">У вас нет прав!</p>
      )}
    </div>
  );
}

EditAuthor.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  author: PropTypes.object,
  onLoadAuthor: PropTypes.func,
  onEditAuthor: PropTypes.func,
  user: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  author: makeSelectAuthorData(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadAuthor: slug => dispatch(loadAuthor(slug)),
    onEditAuthor: author => dispatch(editAuthor(author)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditAuthor);
