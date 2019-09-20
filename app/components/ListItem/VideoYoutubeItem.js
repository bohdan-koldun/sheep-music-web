import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
// import { FormattedMessage } from 'react-intl';
// import commonMessages from 'translations/common-messages';
import { Link } from 'react-router-dom';
// import { AuthorImg } from 'components/Img';
// import { SongsMessage, AlbumsMessage } from 'components/Message';
import './VideoYoutubeItem.scss';

function VideoYoutubeItem({ video }) {
  return (
    <div className="song-video-item">
      <div className="player-wrapper">
        <ReactPlayer
          url={video.video}
          className="react-player"
          config={{
            youtube: {
              playerVars: { showinfo: 0, controls: 1 },
            },
          }}
          width="100%"
          height="100%"
        />
      </div>{' '}
      <Link to={`/song/${video.slug}`}>{video.title}</Link>
    </div>
  );
}

VideoYoutubeItem.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    video: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default VideoYoutubeItem;
