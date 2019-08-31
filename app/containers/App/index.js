import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import Song from 'containers/Song/Loadable';
import SongList from 'containers/SongList/Loadable';
import Album from 'containers/Album/Loadable';
import AlbumList from 'containers/AlbumList/Loadable';
import Author from 'containers/Author/Loadable';
import AuthorList from 'containers/AuthorList/Loadable';
import AudioPlayer from 'containers/AudioPlayer/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './App.scss';

const AppWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <Fragment>
      <Helmet titleTemplate="%s - SheepMusic" defaultTitle="Sheep Music">
        <meta
          name="description"
          content="Христианские песни: слова, аудио, mp3, текст, аккорды"
        />
      </Helmet>
      <Header />
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/songs" component={SongList} />
          <Route path="/song/:slug" component={Song} />
          <Route path="/album/:slug" component={Album} />
          <Route path="/albums" component={AlbumList} />
          <Route path="/author/:slug" component={Author} />
          <Route path="/authors" component={AuthorList} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </AppWrapper>
      <Footer />
      <AudioPlayer />
    </Fragment>
  );
}
