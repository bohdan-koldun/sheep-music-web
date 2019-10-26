import React from 'react';
import PropTypes from 'prop-types';

const Barre = ({ stroke, fret }) =>
  fret > 0 ? (
    <ellipse
      cx="100"
      cy={50 * fret}
      fill={stroke}
      strokeWidth="0"
      ry="3"
      rx="80"
    />
  ) : null;

Barre.propTypes = {
  stroke: PropTypes.string.isRequired,
  fret: PropTypes.number,
};
Barre.defaultProps = {
  fret: 1,
};

export default Barre;
