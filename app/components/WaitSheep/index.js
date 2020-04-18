import React from 'react';
import PropTypes from 'prop-types';
import './WaitSheep.scss';

function WaitSheep({ message }) {
  const waitSheepImg = `https://sheep.fra1.digitaloceanspaces.com/wait-sheep/sheep-wait-${Math.round(
    0.5 + Math.random() * 11,
  )}.gif`;
  return (
    <div className="wait-sheep">
      <img src={waitSheepImg} alt="Fun Sheep" />
      {message && <p>{message}</p>}
    </div>
  );
}

WaitSheep.propTypes = {
  message: PropTypes.string,
};

export default WaitSheep;
