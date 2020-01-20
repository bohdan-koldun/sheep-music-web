/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
  makeSelectResultAdding,
} from './selectors';
import { addSong, updateSongStore, clearSongStore } from './actions';
import reducer from './reducer';
import saga from './saga';
import './AddSong.scss';

export function AddSong({
  song,
  result,
  user,
  error,
  loading,
  globalLoading,
  onAddSong,
  // TODO: onUpdateSongStore,
  onClearSongStore,
}) {
  useInjectReducer({ key: 'addSong', reducer });
  useInjectSaga({ key: 'addSong', saga });

  // const getSongState = () => ({
  //   title,
  //   text,
  //   chords,
  //   video,
  //   chordsKey: chordsKey && chordsKey.value,
  // });
  //
  // useEffect(
  //   () => () => {
  //     onUpdateSongStore(getSongState());
  //   },
  //   [title, text, chords, video, chordsKey],
  // );

  const isAdminOrModerator = checkUserPermissions(user, ['admin', 'moderator']);

  return (
    <React.Fragment>
      <h1>Добавить песню:</h1>
      {isAdminOrModerator ? (
        <div className="add-song-page">
          {loading || globalLoading ? (
            <Loader />
          ) : (
            (result && (
              <div>
                <h2>
                  Песня добавлена:{' '}
                  <Link to={`/song/${result.slug}`}>{result.title}</Link>
                </h2>
                <button type="button" onClick={onClearSongStore}>
                  Добавить еще
                </button>
              </div>
            )) || (
              <SongForm song={song} outsideError={error} onSubmit={onAddSong} />
            )
          )}
        </div>
      ) : (
        <p className="error-label">У вас нет прав!</p>
      )}
    </React.Fragment>
  );
}

AddSong.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  globalLoading: PropTypes.bool,
  song: PropTypes.object,
  result: PropTypes.object,
  onAddSong: PropTypes.func,
  // onUpdateSongStore: PropTypes.func,
  onClearSongStore: PropTypes.func,
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
  song: makeSelectSongData(),
  result: makeSelectResultAdding(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddSong: song => dispatch(addSong(song)),
    onUpdateSongStore: song => dispatch(updateSongStore(song)),
    onClearSongStore: () => dispatch(clearSongStore()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddSong);
