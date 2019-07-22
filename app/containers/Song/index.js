/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongData,
} from './selectors';
import { loadSong } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Song({ songData, onLoadSong, match }) {
  useInjectReducer({ key: 'song', reducer });
  useInjectSaga({ key: 'song', saga });

  useEffect(() => {
    onLoadSong(match.params.slug);
  }, []);

  return (
    <React.Fragment>
      {songData ? (
        <div>
          <Helmet>
            <title>{songData.title}</title>
            <meta name="description" content="Description of Song" />
          </Helmet>
          <h1>{songData.title}</h1>
          <div>
            {songData.author && (
              <div>
                <span>
                  {'    '}
                  <FormattedMessage {...messages.author} />:{' '}
                </span>
                <Link to={`/author/${songData.author.slug}`}>
                  {songData.author.title}
                </Link>
              </div>
            )}
            {songData.album && (
              <div>
                <span>
                  {'    '}
                  <FormattedMessage {...messages.album} />:{' '}
                </span>
                <Link to={`/album/${songData.album.slug}`}>
                  {songData.album.title}
                </Link>
              </div>
            )}
          </div>

          <figure>
            <audio
              controls
              src={songData.audioMp3 ? songData.audioMp3.path : ''}
            >
              <track kind="captions" />
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </figure>
          <pre>{songData ? songData.text : null}</pre>
          {songData.video && (
            <ReactPlayer
              url={songData.video}
              config={{
                youtube: {
                  playerVars: { showinfo: 0, controls: 1 },
                },
              }}
            />
          )}
        </div>
      ) : null}
    </React.Fragment>
  );
}

Song.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  songData: PropTypes.object,
  onLoadSong: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  songData: makeSelectSongData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSong: slug => dispatch(loadSong(slug)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Song);
