import React from 'react';
import PropTypes from 'prop-types';
import ChordSvg from '../ChordSvg';

function Chord({ chordRoot, chordTail, style }) {
  let quality;

  switch (chordTail) {
    case 'm':
      quality = 'MIN';
      break;
    default:
      quality = 'MAJ';
      break;
  }

  return <ChordSvg chord={chordRoot} quality={quality} style={style} />;
}

Chord.propTypes = {
  chordRoot: PropTypes.string,
  chordTail: PropTypes.string,
  style: PropTypes.object,
};

export default Chord;
