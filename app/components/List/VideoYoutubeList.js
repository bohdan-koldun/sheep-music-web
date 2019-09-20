import React from 'react';
import PropTypes from 'prop-types';
import { VideoYoutubeItem } from 'components/ListItem';
import './VideoYoutubeList.scss';

function VideoYoutubeList({ videos }) {
  return videos ? (
    <div className="video-list">
      {videos.map(video => (
        <VideoYoutubeItem key={video.slug} video={video} />
      ))}
    </div>
  ) : null;
}

VideoYoutubeList.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      video: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
};

export default VideoYoutubeList;
