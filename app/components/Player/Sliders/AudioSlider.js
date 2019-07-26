import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import './AudioSlider.scss';

function AudioSlider({ value, onChange }) {
  return (
    <div className="audio-player-slider">
      <Slider
        min={0}
        max={1000}
        value={value}
        onChange={val => onChange(val / 1000)}
      />
    </div>
  );
}

AudioSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default AudioSlider;
