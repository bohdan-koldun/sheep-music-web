/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextLine, ChordLine } from './songLine';
import keys from './keys';
import { isChordLine } from './regexp';
import './chords-transposer.scss';

function ChordsTransposer({ chordsKey, songChords }) {
  const rootKey = keys.getKeyByName(chordsKey);
  const [currentKey, setCurrentKey] = useState(rootKey);
  const lines = (songChords && songChords.split(/\r\n|\n/g)) || [];

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
          if (isChordLine(line))
            return (
              <ChordLine
                chordLine={line}
                key={index}
                chordKey={currentKey || rootKey}
                rootKey={rootKey}
              />
            );
          return <TextLine textLine={line} key={index} />;
        })}
      </pre>
    </div>
  ) : null;
}

ChordsTransposer.propTypes = {
  chordsKey: PropTypes.string,
  songChords: PropTypes.string,
};

export default ChordsTransposer;
