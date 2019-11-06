import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { PrivateRoute } from 'utils/privateRoute';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import SongChords from 'containers/SongChords/Loadable';
import Song from 'containers/Song/Loadable';
import SongList from 'containers/SongList/Loadable';
import Album from 'containers/Album/Loadable';
import AlbumList from 'containers/AlbumList/Loadable';
import Author from 'containers/Author/Loadable';
import AuthorList from 'containers/AuthorList/Loadable';
import Video from 'containers/Video/Loadable';
import VideoList from 'containers/VideoList/Loadable';
import AudioPlayer from 'containers/AudioPlayer/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import EditSong from 'containers/EditSong/Loadable';
import EditAuthor from 'containers/EditAuthor/Loadable';
import EditAlbum from 'containers/EditAlbum/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectUser,
} from './selectors';
import { loadTags, loadUser } from './actions';
import reducer from './reducer';
import saga from './saga';
import ScrollToTop from './ScrollToTop';
import './App.scss';

const AppWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
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
      <Header user={user} />
      <AppWrapper>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/songs" component={SongList} />
            <Route path="/song/:slug" component={Song} />
            <Route path="/chord/:slug" component={SongChords} />
            <Route path="/album/:slug" component={Album} />
            <Route path="/albums" component={AlbumList} />
            <Route path="/author/:slug" component={Author} />
            <Route path="/authors" component={AuthorList} />
            <Route path="/video/:slug" component={Video} />
            <Route path="/videos" component={VideoList} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/edit/song/:slug" component={EditSong} />
            <PrivateRoute path="/edit/author/:slug" component={EditAuthor} />
            <PrivateRoute path="/edit/album/:slug" component={EditAlbum} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </ScrollToTop>
      </AppWrapper>
      <Footer />
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
  loading: makeSelectLoading(),
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
