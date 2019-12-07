/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Select from 'react-select';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import checkUserPermissions from 'utils/checkPermissions';
import * as striptags from 'striptags';
import BeatLoader from 'react-spinners/BeatLoader';
import { makeSelectUser } from 'containers/App/selectors';
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
  onEditSong,
}) {
  useInjectReducer({ key: 'editSong', reducer });
  useInjectSaga({ key: 'editSong', saga });

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [chords, setChords] = useState('');
  const [video, setVideo] = useState('');
  const [chordsKey, setChordsKey] = useState();

  useEffect(() => {
    onLoadSong(match.params.slug);
  }, []);

  useEffect(() => {
    if (song) {
      setTitle(song.title || '');
      setText(striptags(song.text || ''));
      setChords(striptags(song.chords) || '');
      setChordsKey({ value: song.chordsKey, label: song.chordsKey });
      setVideo(song.video || '');
    }
  }, [song]);

  const options = [
    { value: 'Ab', label: 'Ab' },
    { value: 'A', label: 'A' },
    { value: 'A#', label: 'A#' },
    { value: 'Bb', label: 'Bb' },
    { value: 'B', label: 'B' },
    { value: 'H', label: 'H' },
    { value: 'С', label: 'С' },
    { value: 'С#', label: 'С#' },
    { value: 'Db', label: 'Db' },
    { value: 'D', label: 'D' },
    { value: 'D#', label: 'D#' },
    { value: 'Еb', label: 'Еb' },
    { value: 'D#', label: 'D#' },
    { value: 'F', label: 'F' },
    { value: 'F#', label: 'F#' },
    { value: 'Gb', label: 'Gb' },
    { value: 'G', label: 'G' },
    { value: 'G#', label: 'G#' },
  ];

  return (
    <div className="edit-song-page">
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
              {song.parsedSource}
            </label>

            <label>
              Название песни:
              <input
                type="text"
                name="title"
                className="song-input"
                placeholder="Название"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </label>
            <label>
              Текст песни:
              <textarea
                name="text"
                rows="15"
                className="song-input"
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </label>
            <label>
              Акорды:
              <textarea
                name="chords"
                className="song-input"
                rows="15"
                value={chords}
                onChange={e => setChords(e.target.value)}
              />
            </label>
            <label>
              Ключ акордов:
              <Select
                value={chordsKey}
                onChange={setChordsKey}
                options={options}
                isSearchable={false}
                className="chords-key-select"
                placeholder="ключ акордов"
              />
            </label>
            <label>
              Видео:
              <input
                type="text"
                name="video"
                className="song-input"
                placeholder="Видео"
                value={video}
                onChange={e => setVideo(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="save-button"
              onClick={() => {
                onEditSong({
                  title,
                  text,
                  chords,
                  video,
                  id: song.id,
                  slug: song.slug,
                  chordsKey: chordsKey.value,
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

EditSong.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
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
