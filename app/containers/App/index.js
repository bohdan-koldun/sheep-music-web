import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
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
import Video from 'containers/Video/Loadable';
import VideoList from 'containers/VideoList/Loadable';
import AudioPlayer from 'containers/AudioPlayer/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { makeSelectLoading, makeSelectError } from './selectors';
import { loadTags } from './actions';
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

function App({ onLoadTags }) {
  useInjectReducer({ key: 'album', reducer });
  useInjectSaga({ key: 'album', saga });

  useEffect(() => {
    onLoadTags();
  }, []);

  return (
    <Fragment>
      <Helmet titleTemplate="%s | Sheep Music" defaultTitle="Sheep Music">
        <meta
          name="description"
          content="Христианские песни: слова, текст, слушать аудио онлайн, скачать mp3, аккорды, видео"
        />
      </Helmet>
      <Header />
      <AppWrapper>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/songs" component={SongList} />
            <Route path="/song/:slug" component={Song} />
            <Route path="/album/:slug" component={Album} />
            <Route path="/albums" component={AlbumList} />
            <Route path="/author/:slug" component={Author} />
            <Route path="/authors" component={AuthorList} />
            <Route path="/video/:slug" component={Video} />
            <Route path="/videos" component={VideoList} />
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
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadTags: () => dispatch(loadTags()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
