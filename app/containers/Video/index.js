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
import Breadcrumb from 'components/Breadcrumb';
import { useIntl } from 'containers/LanguageProvider';
import menuMessages from 'components/Menu/messages';
import Loader from 'components/Loader';
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

export function Video({ onLoadVideo, match, videoData, loading }) {
  useInjectReducer({ key: 'video', reducer });
  useInjectSaga({ key: 'video', saga });

  const intl = useIntl();

  useEffect(() => {
    onLoadVideo(match.params.slug);
  }, []);

  const title =
    videoData &&
    `${videoData.title} | Видео | Клип | Youtube${
      videoData.author ? ` | ${videoData.author.title}` : ''
    }`;
  const description = `Видеоклип пени ${videoData.title}.${
    videoData.author ? ` Исполнитель ${videoData.author.title}.` : ''
  }${videoData.album ? ` Альбом ${videoData.album.title}.` : ''}`;

  return (
    <React.Fragment>
      {!loading && videoData ? (
        <div className="video-page">
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="video.other" />
            <meta
              property="og:url"
              content={`https://sheep-music.com/video/${videoData.slug}`}
            />
            <meta property="og:site_name" content="Sheep Music" />
            <meta property="og:description" content={description} />
            <meta property="og:video" content={videoData.video} />
          </Helmet>

          <Breadcrumb
            pageList={[
              {
                link: '/videos',
                name: intl.formatMessage(menuMessages.videos),
              },
              { link: `/video/${videoData.slug}`, name: videoData.title },
            ]}
          />

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
            <p>
              <b>
                <FormattedMessage {...commonMessages.words} />:{' '}
              </b>
              <Link to={`/song/${videoData.slug}`}>{videoData.title}</Link>
            </p>
            <p>
              <b>
                <FormattedMessage {...commonMessages.chords} />:{' '}
              </b>
              <Link to={`/chord/${videoData.slug}`}>{videoData.title}</Link>
            </p>
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
      ) : (
        (loading && <Loader />) || null
      )}
    </React.Fragment>
  );
}

Video.propTypes = {
  loading: PropTypes.bool,
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
