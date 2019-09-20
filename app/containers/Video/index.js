import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'translations/common-messages';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectVideoData,
} from './selectors';
import { loadVideo } from './actions';
import reducer from './reducer';
import saga from './saga';
import './Video.scss';

export function Video({ onLoadVideo, match, videoData }) {
  useInjectReducer({ key: 'video', reducer });
  useInjectSaga({ key: 'video', saga });

  useEffect(() => {
    onLoadVideo(match.params.slug);
  }, []);

  return (
    <React.Fragment>
      {videoData && (
        <div className="video-page">
          <Helmet>
            <title>
              {`${videoData.title} | Видео | Клип | Youtube`}
              {videoData.author ? ` | ${videoData.author.title}` : ''}
            </title>
            <meta
              name="description"
              content={`Видеоклип пени ${videoData.title}.${
                videoData.author
                  ? ` Исполнитель ${videoData.author.title}.`
                  : ''
              }${videoData.album ? ` Альбом ${videoData.album.title}.` : ''}`}
            />
          </Helmet>
          <h1>
            <FormattedMessage {...commonMessages.video} /> {videoData.title}
          </h1>

          {videoData.video && (
            <div className="player-wrapper">
              <ReactPlayer
                url={videoData.video}
                className="react-player"
                config={{
                  youtube: {
                    playerVars: { showinfo: 0, controls: 1 },
                  },
                }}
                width="100%"
                height="100%"
              />
            </div>
          )}

          <div className="video-page-info">
            {videoData.author && (
              <p>
                <b>
                  <FormattedMessage {...commonMessages.author} />:{' '}
                </b>
                <Link to={`/author/${videoData.author.slug}`}>
                  {videoData.author.title}
                </Link>
              </p>
            )}
            {videoData.album && (
              <p>
                <b>
                  <FormattedMessage {...commonMessages.album} />:{' '}
                </b>
                <Link to={`/album/${videoData.album.slug}`}>
                  {videoData.album.title}
                </Link>
              </p>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

Video.propTypes = {
  videoData: PropTypes.object,
  onLoadVideo: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  videoData: makeSelectVideoData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadVideo: slug => dispatch(loadVideo(slug)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Video);
