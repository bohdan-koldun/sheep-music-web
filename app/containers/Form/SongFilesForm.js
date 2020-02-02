/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import './SongFilesForm.scss';

function SongFilesForm({ song = {}, outsideError, onSubmit }) {
  const [songMp3, setSongMp3] = useState(null);
  const [phonogramMp3, setPhonogramMp3] = useState(null);
  const [songMp3PreviewUrl, setSongMp3PreviewUrl] = useState(null);
  const [phonogramMp3PreviewUrl, setPhonogramMp3PreviewUrl] = useState(null);

  const handleAudioChange = (event, setBuffer, setUrl) => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      setBuffer(file);
      setUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const songMp3Url = songMp3PreviewUrl || (song.audioMp3 && song.audioMp3.path);
  const phonogramMp3Url =
    phonogramMp3PreviewUrl || (song.phonogramMp3 && song.phonogramMp3.path);

  const getSongFilesState = () => ({
    songMp3,
    phonogramMp3,
  });

  return (
    <form className="song-add-files-form">
      <Link to={`/song/${song.slug}`}>
        {song.title}
        {song.author && ` • ${song.author.title}`}
      </Link>
      <hr />
      <label className="source-label">{song.parsedSource}</label>
      <label>
        Песня mp3:
        <input
          type="file"
          name="songMp3"
          className="upload-mp3-input"
          accept="audio/mpeg3"
          onChange={event =>
            handleAudioChange(event, setSongMp3, setSongMp3PreviewUrl)
          }
        />
        {songMp3Url && <audio src={songMp3Url} controls />}
      </label>
      <label>
        Фонограмма mp3:
        <input
          type="file"
          name="phonogramMp3"
          className="upload-mp3-input"
          accept="audio/mpeg3"
          onChange={event =>
            handleAudioChange(event, setPhonogramMp3, setPhonogramMp3PreviewUrl)
          }
        />
        {phonogramMp3Url && <audio src={phonogramMp3Url} controls />}
      </label>
      <button
        type="button"
        className="save-button"
        onClick={() => {
          onSubmit(getSongFilesState());
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

SongFilesForm.propTypes = {
  song: PropTypes.object,
  onSubmit: PropTypes.func,
  outsideError: PropTypes.any,
};

const withConnect = connect(
  null,
  null,
);

export default compose(withConnect)(SongFilesForm);
