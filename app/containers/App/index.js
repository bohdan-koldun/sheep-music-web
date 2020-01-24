import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { handlerCopy } from 'utils/copy';
import { PrivateRoute } from 'utils/privateRoute';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage';
import SongChords from 'containers/SongChords';
import Song from 'containers/Song';
import SongList from 'containers/SongList';
import TagList from 'containers/TagList';
import Album from 'containers/Album';
import AlbumList from 'containers/AlbumList';
import Author from 'containers/Author';
import AuthorList from 'containers/AuthorList';
import Video from 'containers/Video';
import VideoList from 'containers/VideoList';
import AudioPlayer from 'containers/AudioPlayer';
import LoginPage from 'containers/LoginPage';
import EditSong from 'containers/EditSong';
import EditAuthor from 'containers/EditAuthor';
import EditAlbum from 'containers/EditAlbum';
import Favorites from 'containers/Favorites';
import Notebook from 'containers/Notebook';
import Add from 'containers/Add';
import AddSong from 'containers/AddSong';
import AddAuthor from 'containers/AddAuthor';
import NotFoundPage from 'containers/NotFoundPage';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import {
  makeSelectGlobalLoading,
  makeSelectError,
  makeSelectUser,
} from './selectors';
import { loadTags, loadUser } from './actions';
import reducer from './reducer';
import saga from './saga';
import ScrollToTop from './ScrollToTop';
import './App.scss';

const AppWrapper = styled.div``;

const AppRightSideWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const AppContainerWrapper = styled.div`
  padding: 8px 10px;
`;

function App({ onLoadTags, onLoadUser, user }) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    onLoadTags();
    onLoadUser();
  }, []);

  return (
    <Fragment>
      <Helmet titleTemplate="%s | Sheep Music" defaultTitle="Sheep Music">
        <meta
          name="description"
          content="Христианские песни: слова, текст, слушать аудио онлайн, скачать mp3, аккорды, видео"
        />
      </Helmet>
      <AppWrapper id="app-wrapper" onCopy={handlerCopy}>
        <Menu user={user} />
        <AppRightSideWrapper id="app-right-wrapper">
          <AppContainerWrapper className="page-container-wrapper">
            <ScrollToTop>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/songs" component={SongList} />
                <Route path="/song/:slug" component={Song} />
                <Route path="/topics" component={TagList} />
                <Route path="/chord/:slug" component={SongChords} />
                <Route path="/album/:slug" component={Album} />
                <Route path="/albums" component={AlbumList} />
                <Route path="/author/:slug" component={Author} />
                <Route path="/authors" component={AuthorList} />
                <Route path="/video/:slug" component={Video} />
                <Route path="/videos" component={VideoList} />
                <Route path="/login" component={LoginPage} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/notebook" component={Notebook} />
                <PrivateRoute path="/edit/song/:slug" component={EditSong} />
                <PrivateRoute
                  path="/edit/author/:slug"
                  component={EditAuthor}
                />
                <PrivateRoute path="/edit/album/:slug" component={EditAlbum} />
                <PrivateRoute path="/add" component={Add} />
                <PrivateRoute path="/add_song" component={AddSong} />
                <PrivateRoute path="/add_author" component={AddAuthor} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </ScrollToTop>
          </AppContainerWrapper>
          <Footer />
        </AppRightSideWrapper>
      </AppWrapper>
      <AudioPlayer />
    </Fragment>
  );
}

App.propTypes = {
  onLoadTags: PropTypes.func,
  onLoadUser: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectGlobalLoading(),
  user: makeSelectUser(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadTags: () => dispatch(loadTags()),
    onLoadUser: () => dispatch(loadUser()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
