/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

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
    <div>
      <Helmet>
        <title>{songData ? songData.title : null}</title>
        <meta name="description" content="Description of Song" />
      </Helmet>
      {songData ? (
        <div>
          <h1>{songData ? songData.title : null}</h1>
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
        </div>
      ) : null}
    </div>
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
