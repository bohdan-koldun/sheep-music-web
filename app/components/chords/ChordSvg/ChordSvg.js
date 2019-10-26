/* eslint-disable react/no-array-index-key */
import React from 'react';
import propTypes from 'prop-types';
import SVGText from './SVGText';
import Barre from './Barre';
import guitarChordShape from './guitarChordShape';
// import Player from './Player';

const ChordSvg = ({
  chord,
  alternate,
  background,
  quality,
  stroke,
  style,
  ...props
}) => {
  const csq = guitarChordShape[chord];
  if (!csq) {
    return null;
  }
  const chordShape = csq[quality][!alternate ? 0 : 1];
  const start = chordShape.s ? chordShape.s : 1;
  const chordName = `${chord}${quality === 'MIN' ? 'm' : ''}`;
  const stringsText = [];
  chordShape.p.forEach((f, i) => {
    if (f === 0 || f === 'x')
      stringsText.push(
        <SVGText x={22 + 30 * i} y={20} fontSize={16} fill={stroke} key={f + i}>
          {f}
        </SVGText>,
      );
  });

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -22 200 250"
        style={{
          width: '150px',
        }}
        {...props}
      >
        <path fill={background} d="M-1-1h202v252H-1z" />
        <g stroke={stroke}>
          <path fill={background} strokeWidth="1.5" d="M25 25h150v200H25z" />
          <path
            fill="none"
            strokeOpacity="null"
            strokeWidth="1.5"
            d="M26 75h150M26 125h150M26 175h150M56 26v199M86 26v199m30-199v199m30-199v199"
            strokeLinecap="null"
            strokeLinejoin="null"
          />
          <SVGText
            x={95 - (chordName.length - 1) * 4}
            y={-5}
            fontSize={20}
            fontWeight={700}
            fill="#FFF"
          >
            {chordName}
          </SVGText>
          {stringsText}
          <SVGText x={5} y={50} fill={stroke}>
            {start}
          </SVGText>
          <SVGText x={5} y={100} fill={stroke}>
            {start + 1}
          </SVGText>
          <SVGText x={5} y={150} fill={stroke}>
            {start + 2}
          </SVGText>
          <SVGText x={5} y={200} fill={stroke}>
            {start + 3}
          </SVGText>
          <Barre fret={chordShape.b} stroke={stroke} />
          {chordShape.p.map((f, i) =>
            f > 0 && f <= 4 ? (
              <ellipse
                key={i}
                cx={26 + 30 * i}
                cy={50 * f}
                fill={stroke}
                strokeOpacity="null"
                strokeWidth="1.5"
                ry="10"
                rx="10"
              />
            ) : null,
          )}
        </g>
      </svg>
      {/* <Player url={`/dist/chord-sounds/${encodeURIComponent(chordName)}.m4a`} /> */}
    </div>
  );
};

ChordSvg.propTypes = {
  chord: propTypes.oneOf([
    'A',
    'A#',
    'Ab',
    'H',
    'Hb',
    'B',
    'Bb',
    'C',
    'C#',
    'D',
    'Db',
    'D#',
    'E',
    'Eb',
    'F',
    'F#',
    'G',
    'G#',
    'Gb',
  ]),
  alternate: propTypes.bool,
  background: propTypes.string,
  quality: propTypes.oneOf(['MAJ', 'MIN']),
  stroke: propTypes.string,
  style: propTypes.object,
};
ChordSvg.defaultProps = {
  alternate: false,
  quality: 'MAJ',
  background: '#FFF',
  stroke: '#222',
};

export default ChordSvg;
