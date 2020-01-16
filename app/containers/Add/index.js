import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FiHeadphones, FiMic } from 'react-icons/fi';
import { IoIosMusicalNotes } from 'react-icons/io';
import { MdRadio } from 'react-icons/md';

import './add.scss';

export default function Add() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Добавить песню, альбом, автора</title>
      </Helmet>
      <h1>Добавить:</h1>
      <div className="add-link">
        <Link to="/add_song">
          <FiHeadphones size={48} />
          <span>Добавить песню</span>
        </Link>
        <Link to="/add_album">
          <IoIosMusicalNotes size={48} />
          <span>Добавить альбом</span>
        </Link>
        <Link to="/add_author">
          <FiMic size={48} />
          <span>Добавить музиканта</span>
        </Link>
        <Link to="/add_radio">
          <MdRadio size={48} />
          <span>Добавить радио</span>
        </Link>
      </div>
    </React.Fragment>
  );
}
