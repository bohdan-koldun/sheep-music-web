/* eslint-disable react/no-danger */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import keys from './keys';
import ChordSvg from './chordSvg';

function createChordArray(str) {
  const { length } = str;
  let offset = 0;
  const chords = [];
  let devider = ' ';

  for (let i = 0; i < length; i += 1) {
    if (str[i] === ' ') {
      offset += 1;
    } else {
      let subStr = '';
      while (str[i] && str[i] !== ' ' && str[i] !== '/' && str[i] !== '-') {
        subStr += str[i];
        i += 1;
      }

      chords.push({ offset, chord: subStr, devider });
      devider = str[i] === '/' ? '/' : (str[i] === '-' && '-') || ' ';
      offset = 0;
    }
  }
  return chords;
}

export function ChordLine({ chordLine, chordKey, rootKey }) {
  const chords = createChordArray(chordLine);
  const delta = keys.getDelta(
    rootKey && rootKey.value,
    chordKey && chordKey.value,
  );
  const currentOffset = [0, 0];

  return (
    <span>
      {chords.map((element, i) => {
        const { chord, offset, devider } = element;
        const oldChordRoot = keys.getChordRoot(chord) || {};
        const newChord = keys.getNewKey(oldChordRoot, delta, chordKey) || {};
        const tailChord = chord.substr(oldChordRoot.length);
        const printedChords = newChord && newChord.name + tailChord;
        currentOffset[0] = currentOffset[1];
        currentOffset[1] += Math.abs(printedChords.length - chord.length);

        let diffOffset = offset - currentOffset[0];

        if (diffOffset <= 0) diffOffset = 0;
        return (
          <b key={printedChords + i}>
            {devider === ' '
              ? devider.repeat(diffOffset)
              : (devider === '/' && '/') || '-'}
            <b
              className={classNames('c', {
                'c-margin': !(
                  chords[i + 1] && ['/', '-'].includes(chords[i + 1].devider)
                ),
              })}
              data-tip
              data-for={printedChords + i}
            >
              {printedChords}
            </b>
            <ReactTooltip
              className="chord-tooltip"
              id={printedChords + i}
              delayHide={100}
              effect="solid"
            >
              <ChordSvg chordRoot={newChord.name} chordTail={tailChord} />
            </ReactTooltip>
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
};

export function TextLine({ textLine }) {
  return <span dangerouslySetInnerHTML={{ __html: textLine }} />;
}

TextLine.propTypes = {
  textLine: PropTypes.string,
};
