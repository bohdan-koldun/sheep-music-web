/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isAdminOrModerator } from 'utils/checkPermissions';
import {
  makeSelectUser,
  makeSelectGlobalLoading,
} from 'containers/App/selectors';
import { SongFilesForm } from 'containers/Form';
import Loader from 'components/Loader';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongData,
} from './selectors';
import { loadSong, addSongFiles } from './actions';
import reducer from './reducer';
import saga from './saga';
import './AddSongFiles.scss';

export function AddSongFiles({
  onLoadSong,
  song,
  user,
  error,
  match,
  loading,
  globalLoading,
  onAddSongFiles,
}) {
  useInjectReducer({ key: 'addSongFiles', reducer });
  useInjectSaga({ key: 'addSongFiles', saga });

  useEffect(() => {
    onLoadSong(match.params.slug);
  }, []);

  return (
    <React.Fragment>
      <h1>Добавление файлов mp3 для песни:</h1>
      <div className="add-song-files-page">
        {loading || globalLoading ? (
          <Loader />
        ) : (
          isAdminOrModerator(user) && (
            <SongFilesForm
              song={song}
              onSubmit={data => {
                onAddSongFiles(
                  {
                    id: song.id,
                    ...data,
                  },
                  song.id,
                );
              }}
              outsideError={error}
            />
          ) || <p className="error-label">У вас нет прав!</p>)
        }
      </div>
    </React.Fragment>
  );
}

AddSongFiles.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  globalLoading: PropTypes.bool,
  song: PropTypes.object,
  onLoadSong: PropTypes.func,
  onAddSongFiles: PropTypes.func,
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
    onAddSongFiles: (song, id) => dispatch(addSongFiles(song, id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddSongFiles);
