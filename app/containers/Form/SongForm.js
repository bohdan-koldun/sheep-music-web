/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import * as striptags from 'striptags';
import { makeSelectTags } from 'containers/App/selectors';
import {
  makeSelectAlbumsIds,
  makeSelectAuthorsIds,
  makeSelectLoading,
} from './selectors';
import { loadAlbumIds, loadAuthorIds } from './actions';
import './SongForm.scss';
import reducer from './reducer';
import saga from './saga';
import { updateSongStore } from '../AddSong/actions';

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
  { value: 'E', label: 'E' },
  { value: 'Еb', label: 'Еb' },
  { value: 'D#', label: 'D#' },
  { value: 'F', label: 'F' },
  { value: 'F#', label: 'F#' },
  { value: 'Gb', label: 'Gb' },
  { value: 'G', label: 'G' },
  { value: 'G#', label: 'G#' },
];

const optionsLanguage = [
  { value: 'ru', label: 'Русский' },
  { value: 'ua', label: 'Украинский' },
  { value: 'en', label: 'Английский' },
  { value: 'be', label: 'Белорусский' },
  { value: 'es', label: 'Испанский' },
  { value: 'pl', label: 'Польский' },
  { value: 'pl', label: 'Французский' },
];

function SongForm({
  song = {},
  outsideError,
  onSubmit,
  onWillUnmount,
  tags = [],
  authors = [],
  albums = [],
  onLoadAlbumsIds,
  onLoadAuthorsIds,
}) {
  useInjectReducer({ key: 'form', reducer });
  useInjectSaga({ key: 'form', saga });

  const [title, setTitle] = useState(song.title || '');
  const [text, setText] = useState(striptags(song.text || ''));
  const [chords, setChords] = useState(striptags(song.chords || ''));
  const [video, setVideo] = useState(song.video || '');
  const [chordsKey, setChordsKey] = useState({
    value: song.chordsKey,
    label: song.chordsKey,
  });
  const [language, setLanguage] = useState(
    optionsLanguage.find(lan => lan.value === song.language),
  );
  const [songTags, setSongTags] = useState(
    song.tags &&
      song.tags.map(
        tag =>
          ({
            value: tag.id,
            label: tag.name,
          } || []),
      ),
  );
  const [author, setAuthor] = useState(
    song.author && {
      value: song.author.id,
      label: song.author.title,
    },
  );
  const [album, setAlbum] = useState(
    song.album && {
      value: song.album.id,
      label: song.album.title,
    },
  );

  useEffect(() => {
    if (
      authors &&
      authors.length &&
      albums &&
      !albums.map(item => item.id).includes(album && album.value)
    ) {
      setAlbum(null);
    } else if (!album && song.album) {
      setAlbum({
        value: song.album.id,
        label: song.album.title,
      });
    }
  }, [author, albums]);

  const tagsOptions = tags.map(tag => ({ value: tag.id, label: tag.name }));
  const authorsOptions = authors.map(item => ({
    value: item.id,
    label: item.title,
  }));
  const albumsOptions = albums.map(item => ({
    value: item.id,
    label: item.title,
  }));

  const getSongState = () => ({
    title,
    text,
    chords,
    video,
    language: language && language.value,
    chordsKey: chordsKey && chordsKey.value,
    tags: songTags && songTags.map(tag => ({ id: tag.value, name: tag.label })),
    author: author && { id: author.value, title: author.label },
    album: album && { id: album.value, title: album.label },
  });

  useEffect(() => {
    if (onWillUnmount) {
      onWillUnmount(getSongState());
    }
  }, [title, text, chords, chordsKey, author, video, album, songTags]);

  return (
    <form className="song-form">
      {song.slug && (
        <Link to={`/song/${song.slug}`}>
          {song.title}
          {song.author && ` • ${song.author.title}`}
        </Link>
      )}
      <label className="source-label">{song.parsedSource}</label>
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
          value={text}
          className="song-textarea"
          onChange={e => setText(e.target.value)}
        >
          {text}
        </textarea>
      </label>
      <label>
        Акорды:
        <textarea
          name="chords"
          rows="15"
          className="song-textarea"
          value={chords}
          onChange={e => setChords(e.target.value)}
        />
      </label>
      <label>
        Ключ акордов:
        <Select
          value={chordsKey}
          onChange={value => setChordsKey(value)}
          options={options}
          isSearchable={false}
          className="options-select"
          placeholder="ключ акордов"
        />
      </label>
      <label>
        Язык:
        <Select
          value={language}
          onChange={value => setLanguage(value)}
          options={optionsLanguage}
          isSearchable
          className="options-select"
          placeholder="язык"
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
      <label>
        Автор песни:
        <Select
          value={author}
          onChange={value => {
            if (!author || author.value !== value.value) {
              setAuthor(value);
              onLoadAlbumsIds(value && value.value);
            }
          }}
          onMenuOpen={() => {
            if (!authors.length) {
              onLoadAuthorsIds();
            }
          }}
          options={authorsOptions}
          isSearchable
          className="options-select"
          placeholder="автор песни"
        />
      </label>
      <label>
        Альбом:
        <Select
          value={album}
          onChange={value => setAlbum(value)}
          onMenuOpen={() => {
            if (!albums.length) {
              onLoadAlbumsIds(author && author.value);
            }
          }}
          options={albumsOptions}
          isSearchable
          className="options-select"
          placeholder="альбом"
        />
      </label>
      <label>
        Тематика песни:
        <Select
          value={songTags}
          onChange={value => setSongTags(value)}
          options={tagsOptions}
          isSearchable
          isMulti
          className="options-select"
          placeholder="тематика песни....."
        />
      </label>
      <button
        type="button"
        className="save-button"
        onClick={() => {
          onSubmit(getSongState());
        }}
      >
        Сохранить
      </button>
      {outsideError && (
        <p className="error-label">
          Ошибка сохранения! {outsideError && outsideError.message}
        </p>
      )}
    </form>
  );
}

SongForm.propTypes = {
  song: PropTypes.object,
  onSubmit: PropTypes.func,
  onWillUnmount: PropTypes.func,
  outsideError: PropTypes.any,
  tags: PropTypes.array,
  albums: PropTypes.array,
  authors: PropTypes.array,
  onLoadAlbumsIds: PropTypes.func,
  onLoadAuthorsIds: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tags: makeSelectTags(),
  albums: makeSelectAlbumsIds(),
  authors: makeSelectAuthorsIds(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadAuthorsIds: albumId => dispatch(loadAuthorIds(albumId)),
    onLoadAlbumsIds: authorId => dispatch(loadAlbumIds(authorId)),
    onUpdateSongStore: song => dispatch(updateSongStore(song)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SongForm);
