/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ChordSvg from './chordSvg';
import { DEVIDERS } from './consts';

function createChordOffsetPairs(line) {
  const { length } = line;
  const resultLine = [];
  const chordOffsetPairs = [];

  let i = 0;

  while (i < length) {
    let str = '';

    while (line[i] && !DEVIDERS.includes(line[i])) {
      str += line[i];
      i += 1;
    }
    resultLine.push(str);

    str = '';
    while (line[i] && DEVIDERS.includes(line[i])) {
      str += line[i];
      i += 1;
    }

    resultLine.push(str);
  }

  for (let j = 0; j < resultLine.length; j += 2) {
    chordOffsetPairs.push({ first: resultLine[j], second: resultLine[j + 1] });
  }

  return chordOffsetPairs;
}

export function ChordLine({ chordLine, lineIndex, uniqueChords }) {
  const chordOffsetPairs = createChordOffsetPairs(chordLine);

  return (
    <span style={{ display: 'inline' }}>
      {chordOffsetPairs.map((pair, i) => {
        const { first, second } = pair;
        const chordText = DEVIDERS.includes(first[0]) ? second : first;

        const chord = uniqueChords && uniqueChords[chordText];

        const printedChord = chord ? chord.chord.name + (chord.tail || '') : '';

        const chordId = printedChord + lineIndex + i;

        return (
          <React.Fragment key={chordId}>
            {chordText === second && first}
            <b
              className="c"
              id={chordId}
              data-tip
              data-for={printedChord}
              style={{ display: 'inline' }}
            >
              {printedChord}
              {chord && (
                <ReactTooltip
                  className="chord-tooltip"
                  id={printedChord}
                  delayHide={100}
                  effect="solid"
                >
                  <ChordSvg
                    chordRoot={chord.chord.name}
                    chordTail={chord.tail}
                    style={{ width: '110px' }}
                  />
                </ReactTooltip>
              )}
            </b>
            {chordText === first && !!second && second}
          </React.Fragment>
        );
      })}
    </span>
  );
}

ChordLine.propTypes = {
  chordLine: PropTypes.string,
  uniqueChords: PropTypes.object,
  lineIndex: PropTypes.number.isRequired,
};

export function TextLine({ textLine }) {
  return <span dangerouslySetInnerHTML={{ __html: textLine }} />;
}

TextLine.propTypes = {
  textLine: PropTypes.string,
};
