/* eslint-disable react/no-danger */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import keys from './keys';
import ChordSvg from './chordSvg';

const DEVIDERS = ['/', '-', ' ', '(', ')', '|'];

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

export function ChordLine({ chordLine, chordKey, rootKey, lineIndex }) {
  const chordOffsetPairs = createChordOffsetPairs(chordLine);
  const delta = keys.getDelta(
    rootKey && rootKey.value,
    chordKey && chordKey.value,
  );

  return (
    <span>
      {chordOffsetPairs.map((pair, i) => {
        const { first, second } = pair;
        const chord = DEVIDERS.includes(first[0]) ? second : first;

        const oldChordRoot = chord && keys.getChordRoot(chord);
        const newChord =
          oldChordRoot && keys.getNewKey(oldChordRoot, delta, chordKey);
        const tailChord =
          chord && oldChordRoot && chord.substr(oldChordRoot.length);
        const printedChords = (newChord && newChord.name + tailChord) || '';

        const chordId = printedChords + lineIndex + i;

        return (
          <b id={chordId} key={chordId}>
            {chord === second && first}
            <b className="c" data-tip data-for={chordId}>
              {printedChords}
            </b>
            {chord === first && !!second && second}
            {printedChords && (
              <ReactTooltip
                className="chord-tooltip"
                id={chordId}
                delayHide={100}
                effect="solid"
              >
                <ChordSvg chordRoot={newChord.name} chordTail={tailChord} />
              </ReactTooltip>
            )}
          </b>
        );
      })}
    </span>
  );
}

ChordLine.propTypes = {
  chordLine: PropTypes.string,
  chordKey: PropTypes.object,
  rootKey: PropTypes.object,
  lineIndex: PropTypes.number.isRequired,
};

export function TextLine({ textLine }) {
  return <span dangerouslySetInnerHTML={{ __html: textLine }} />;
}

TextLine.propTypes = {
  textLine: PropTypes.string,
};
