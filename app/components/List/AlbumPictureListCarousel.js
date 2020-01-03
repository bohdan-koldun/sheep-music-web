import React from 'react';
import PropTypes from 'prop-types';
import { AlbumListItem } from 'components/ListItem';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './AlbumPictureList.scss';

const responsive = {
  superLargeDesktop: {
    breakpoint: {
      max: 5000,
      min: 1700,
    },
    items: 7,
    partialVisibilityGutter: 60,
  },
  desktop: {
    breakpoint: {
      max: 1700,
      min: 750,
    },
    items: 4,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 470,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 70,
  },
  tablet: {
    breakpoint: {
      max: 750,
      min: 470,
    },
    items: 2,
    partialVisibilityGutter: 20,
  },
};

function AlbumPictureListCarousel({ albums }) {
  return albums ? (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode
      className=""
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
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {albums.map(album => (
        <AlbumListItem key={album.slug} album={album} />
      ))}
    </Carousel>
  ) : null;
}

AlbumPictureListCarousel.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
};

export default AlbumPictureListCarousel;
