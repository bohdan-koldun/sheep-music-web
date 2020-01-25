/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import checkUserPermissions from 'utils/checkPermissions';
import { makeSelectUser } from 'containers/App/selectors';
import { AlbumForm } from 'containers/Form';
import Loader from 'components/Loader';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumData,
} from './selectors';
import { loadAlbum, editAlbum, loadAuthorIds } from './actions';
import reducer from './reducer';
import saga from './saga';
import './EditAlbum.scss';

export function EditAlbum({
  onLoadAlbum,
  album,
  user,
  error,
  match,
  loading,
  onEditAlbum,
  onLoadAuthorIds,
}) {
  useInjectReducer({ key: 'editAlbum', reducer });
  useInjectSaga({ key: 'editAlbum', saga });

  useEffect(() => {
    onLoadAlbum(match.params.slug);
    onLoadAuthorIds();
  }, []);

  return (
    <React.Fragment>
      <h1>Редактирование альбома:</h1>
      <div className="edit-album-page">
        {loading ? (
          <Loader />
        ) : (
          (checkUserPermissions(user, ['admin', 'moderator']) && (
            <AlbumForm
              album={album}
              onSubmit={data => onEditAlbum({ ...data, id: album.id })}
              outsideError={error}
            />
          )) ||
          (user && <p className="error-label">У вас нет прав!</p>)
        )}
      </div>
    </React.Fragment>
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
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  album: makeSelectAlbumData(),
  user: makeSelectUser(),
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
