/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FaYoutube } from 'react-icons/fa';
import getVideoId from 'get-video-id';
import './VideoYoutubeItem.scss';

function VideoYoutubeItem({ video }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="song-video-item">
      <div
        className="video-item-picture"
        style={{
          backgroundImage: `url(https://img.youtube.com/vi/${
            getVideoId(video.video).id
          }/hqdefault.jpg)`,
        }}
        onClick={() => {
          setPlay(!play);
        }}
      >
        {!play && <AiOutlineYoutube className="video-play-icon" />}
        {play && (
          <div className="player-wrapper">
            <ReactPlayer
              url={video.video}
              className="react-player"
              playing={play}
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
      </div>
      <Link to={`/video/${video.slug}`} className="video-link">
        <FaYoutube />
        <span>{video.title}</span>
      </Link>
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
