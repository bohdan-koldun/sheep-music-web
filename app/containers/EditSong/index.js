/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import checkUserPermissions from 'utils/checkPermissions';
import {
  makeSelectUser,
  makeSelectGlobalLoading,
} from 'containers/App/selectors';
import { SongForm } from 'containers/Form';
import Loader from 'components/Loader';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongData,
} from './selectors';
import { loadSong, editSong } from './actions';
import reducer from './reducer';
import saga from './saga';
import './EditSong.scss';

export function EditSong({
  onLoadSong,
  song,
  user,
  error,
  match,
  loading,
  globalLoading,
  onEditSong,
}) {
  useInjectReducer({ key: 'editSong', reducer });
  useInjectSaga({ key: 'editSong', saga });

  useEffect(() => {
    onLoadSong(match.params.slug);
  }, []);

  const isAdminOrModerator = checkUserPermissions(user, ['admin', 'moderator']);

  return (
    <React.Fragment>
      <h1>Редактирование песни:</h1>
      <div className="edit-song-page">
        {loading || globalLoading ? (
          <Loader />
        ) : (
          isAdminOrModerator && (
            <SongForm
              song={song}
              onSubmit={data => {
                onEditSong({
                  id: song.id,
                  ...data,
                });
              }}
              outsideError={error}
            />
          ) || <p className="error-label">У вас нет прав!</p>)
        }
      </div>
    </React.Fragment>
  );
}

EditSong.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  globalLoading: PropTypes.bool,
  song: PropTypes.object,
  onLoadSong: PropTypes.func,
  onEditSong: PropTypes.func,
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
  song: makeSelectSongData(),
  globalLoading: makeSelectGlobalLoading(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadSong: slug => dispatch(loadSong(slug)),
    onEditSong: song => dispatch(editSong(song)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditSong);
