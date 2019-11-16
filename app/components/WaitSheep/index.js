import React from 'react';
import PropTypes from 'prop-types';
import './WaitSheep.scss';

function WaitSheep({ message }) {
  // eslint-disable-next-line global-require
  const WaitSheepImg = require(`./sheep-wait-images/sheep-wait-${Math.round(
    0.5 + Math.random() * 11,
  )}.gif`);
  return (
    <div className="wait-sheep">
      <img src={WaitSheepImg} alt="Fun Sheep" />
      {message && <p>{message}</p>}
    </div>
  );
}

WaitSheep.propTypes = {
  message: PropTypes.string,
};

export default WaitSheep;
