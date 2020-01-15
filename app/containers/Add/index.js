import React from 'react';
import { Helmet } from 'react-helmet';

export default function Add() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Добавить песню, альбом, автора</title>
      </Helmet>
      <div>Добавить:</div>
    </React.Fragment>
  );
}
