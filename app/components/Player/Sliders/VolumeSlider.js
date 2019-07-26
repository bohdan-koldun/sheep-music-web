import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import './VolumeSlider.scss';

function VolumeSlider({ value, onChange }) {
  return (
    <div className="volume-player-slider">
      <Slider
        min={0}
        max={1000}
        value={value}
        onChange={val => onChange(val / 1000)}
      />
    </div>
  );
}
VolumeSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default VolumeSlider;
