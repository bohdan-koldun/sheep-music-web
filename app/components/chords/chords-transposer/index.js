/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextLine, ChordLine } from './songLine';
import keys from './keys';
import ChordSvg from './chordSvg';
import { isChordLine } from './regexp';
import { DEVIDERS } from './consts';
import './chords-transposer.scss';

const getChordsSet = chords => {
  const { length } = chords;
  const result = new Set();

  for (let i = 0; i < length; i += 1) {
    let chord = '';

    while (!DEVIDERS.includes(chords[i]) && i < length) {
      chord += chords[i];
      i += 1;
    }

    if (chord) {
      result.add(chord);
    }
  }

  return [...result];
};

function ChordsTransposer({ chordsKey, songChords }) {
  const rootKey = keys.getKeyByName(chordsKey);
  const [currentKey, setCurrentKey] = useState(rootKey);

  const chordKey = currentKey || rootKey;
  const delta = keys.getDelta(
    rootKey && rootKey.value,
    chordKey && chordKey.value,
  );

  const lines = (songChords && songChords.split(/\r\n|\n/g)) || [];
  const uniqueChords =
    getChordsSet(lines.filter(line => isChordLine(line)).join(' ')).reduce(
      (result, chord) => {
        const oldChordRoot = keys.getChordRoot(chord);

        const chordObj = {
          chord: keys.getNewKey(oldChordRoot, delta, chordKey),
          tail: chord.substr(oldChordRoot.length),
        };

        if (chordObj.chord) {
          result[chord] = chordObj;
        }

        return result;
      },
      {},
    ) || {};

  const handleKeyLinkClick = e => {
    setCurrentKey(keys.getKeyByName(e.target.innerHTML));
  };

  return songChords ? (
    <div className="chord-page-content">
      <div className="transpose-keys">
        {keys.keys.map((key, i) => {
          if (
            (currentKey && currentKey.name === key.name) ||
            (!currentKey && rootKey && rootKey.name === key.name)
          ) {
            return (
              <span key={key.name} className="selected">
                {key.name}
              </span>
            );
          }
          return (
            <span key={i} onClick={handleKeyLinkClick}>
              {key && key.name}
            </span>
          );
        })}
      </div>
      <pre className="chords-pre">
        {lines.map((line, index) => {
          if (isChordLine(line)) {
            return (
              <ChordLine
                chordLine={line}
                uniqueChords={uniqueChords}
                lineIndex={index}
                key={`chord-line-${index}`}
              />
            );
          }
          return <TextLine textLine={line} key={`song-line-${index}`} />;
        })}
      </pre>
      <div className="footer-chords-svg">
        {Object.values(uniqueChords).map(chord => {
          const printedChord = chord.chord.name + chord.tail;

          return (
            <ChordSvg
              chordRoot={chord.chord.name}
              chordTail={chord.tail}
              style={{ width: '80px', margin: '5px' }}
              key={printedChord}
            />
          );
        })}
      </div>
    </div>
  ) : null;
}

ChordsTransposer.propTypes = {
  chordsKey: PropTypes.string,
  songChords: PropTypes.string,
};

export default ChordsTransposer;
