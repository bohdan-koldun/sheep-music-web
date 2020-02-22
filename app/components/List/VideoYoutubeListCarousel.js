import React from 'react';
import PropTypes from 'prop-types';
import { VideoYoutubeItem } from 'components/ListItem';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './VideoYoutubeList.scss';

const responsive = {
  superLargeDesktop: {
    breakpoint: {
      max: 5000,
      min: 1700,
    },
    items: 5,
  },
  desktop: {
    breakpoint: {
      max: 1700,
      min: 750,
    },
    items: 3,
  },
  mobile: {
    breakpoint: {
      max: 380,
      min: 0,
    },
    items: 1,
  },
  tablet: {
    breakpoint: {
      max: 750,
      min: 380,
    },
    items: 1,
  },
};

function VideoYoutubeListCarousel({ songs }) {
  return songs ? (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      showDots={false}
      slidesToSlide={1}
      swipeable
    >
      {songs.map(song => (
        <VideoYoutubeItem key={song.slug} video={song} />
      ))}
    </Carousel>
  ) : null;
}

VideoYoutubeListCarousel.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      video: PropTypes.string,
      slug: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
};

export default VideoYoutubeListCarousel;
