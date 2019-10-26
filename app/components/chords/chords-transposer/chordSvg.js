import React from 'react';
import PropTypes from 'prop-types';
import ChordSvg from '../ChordSvg';

function TextLine({ chordRoot, chordTail }) {
  let quality;

  switch (chordTail) {
    case 'm':
      quality = 'MIN';
      break;
    default:
      quality = 'MAJ';
      break;
  }

  return <ChordSvg chord={chordRoot} quality={quality} />;
}

TextLine.propTypes = {
  chordRoot: PropTypes.string,
  chordTail: PropTypes.string,
};

export default TextLine;
