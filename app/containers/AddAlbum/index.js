/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isAdminOrModerator } from 'utils/checkPermissions';
import {
  makeSelectUser,
  makeSelectGlobalLoading,
} from 'containers/App/selectors';
import { AlbumForm } from 'containers/Form';
import Loader from 'components/Loader';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumData,
  makeSelectResultAdding,
} from './selectors';
import { addAlbum, updateAlbumStore, clearAlbumStore } from './actions';
import reducer from './reducer';
import saga from './saga';
import './AddAlbum.scss';

export function AddAlbum({
  album,
  result,
  user,
  error,
  loading,
  globalLoading,
  onAddAlbum,
  onUpdateAlbumStore,
  onClearAlbumStore,
}) {
  useInjectReducer({ key: 'addAlbum', reducer });
  useInjectSaga({ key: 'addAlbum', saga });

  return (
    <React.Fragment>
      <h1>Добавить альбом:</h1>
      {isAdminOrModerator(user) ? (
        <div className="add-album-page">
          {loading || globalLoading ? (
            <Loader />
          ) : (
            (result && (
              <div>
                <h2>
                  Песня добавлена:{' '}
                  <Link to={`/albums/${result.slug}`}>{result.title}</Link>
                </h2>
                <button type="button" onClick={onClearAlbumStore}>
                  Добавить еще
                </button>
              </div>
            )) || (
              <AlbumForm
                album={album}
                outsideError={error}
                onSubmit={onAddAlbum}
                onWillUnmount={onUpdateAlbumStore}
              />
            )
          )}
        </div>
      ) : (
        <p className="error-label">У вас нет прав!</p>
      )}
    </React.Fragment>
  );
}

AddAlbum.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  globalLoading: PropTypes.bool,
  album: PropTypes.object,
  result: PropTypes.object,
  onAddAlbum: PropTypes.func,
  onUpdateAlbumStore: PropTypes.func,
  onClearAlbumStore: PropTypes.func,
  user: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  globalLoading: makeSelectGlobalLoading(),
  error: makeSelectError(),
  album: makeSelectAlbumData(),
  result: makeSelectResultAdding(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddAlbum: album => dispatch(addAlbum(album)),
    onClearAlbumStore: () => dispatch(clearAlbumStore()),
    onUpdateAlbumStore: album => dispatch(updateAlbumStore(album)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddAlbum);
