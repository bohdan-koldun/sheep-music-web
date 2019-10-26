/**
 * shape {
 *  chord{
 *    type: {
 *      b: barre
 *      s: start
 *      p: [string6,string2,string3,string4,string5,string1]
 *    }
 *  }
 * }
 */
const chordCommon = p => b => s => ({ b, s, p });
const barreCommonEMajShape = chordCommon([0, 3, 3, 2, 0, 0])(1);
const barreCommonEMinShape = chordCommon([0, 3, 3, 0, 0, 0])(1);
const barreCommonAMajShape = chordCommon(['x', 0, 3, 3, 3, 0])(1);
const barreCommonAMinShape = chordCommon(['x', 0, 3, 3, 2, 0])(1);
const chordMajMin = (MAJ, MIN) => ({ MAJ, MIN });

export default {
  A: chordMajMin(
    [chordCommon(['x', 0, 2, 2, 2, 0])(0)(0), barreCommonEMajShape(5)],
    [chordCommon(['x', 0, 2, 2, 1, 0])(0)(0), barreCommonEMinShape(5)],
  ),
  'A#': chordMajMin(
    [chordCommon(['x', 1, 3, 3, 3, 2])(1)(0), barreCommonEMajShape(6)],
    [chordCommon(['x', 1, 3, 3, 2, 2])(1)(0), barreCommonEMinShape(6)],
  ),
  Ab: chordMajMin(
    [chordCommon([1, 3, 3, 2, 1, 1])(1)(4), barreCommonEMajShape(5)],
    [chordCommon([1, 3, 3, 1, 1, 1])(1)(4), barreCommonEMinShape(5)],
  ),
  B: chordMajMin(
    [chordCommon(['x', 2, 4, 4, 4, 2])(1)(0), barreCommonEMajShape(7)],
    [chordCommon(['x', 2, 4, 4, 3, 2])(1)(0), barreCommonEMinShape(7)],
  ),
  Bb: chordMajMin(
    [chordCommon(['x', 1, 3, 3, 3, 1])(1)(0), barreCommonEMajShape(7)],
    [chordCommon(['x', 1, 3, 3, 2, 1])(1)(0), barreCommonEMinShape(7)],
  ),
  C: chordMajMin(
    [chordCommon(['x', 3, 2, 0, 1, 0])(0)(0), barreCommonEMajShape(8)],
    [chordCommon(['x', 1, 3, 3, 2, 1])(1)(3), barreCommonEMinShape(8)],
  ),
  'C#': chordMajMin(
    [chordCommon(['x', 1, 3, 3, 3, 1])(1)(4), barreCommonEMajShape(9)],
    [chordCommon(['x', 1, 4, 3, 2, 1])(1)(4), barreCommonEMinShape(9)],
  ),
  D: chordMajMin(
    [chordCommon(['x', 'x', 0, 2, 3, 2])(0)(0), barreCommonAMajShape(5)],
    [chordCommon(['x', 'x', 0, 2, 3, 1])(0)(0), barreCommonAMinShape(5)],
  ),
  'D#': chordMajMin(
    [chordCommon(['x', 'x', 1, 3, 4, 3])(0)(0), barreCommonEMajShape(11)],
    [chordCommon(['x', 1, 3, 3, 2, 1])(1)(6), barreCommonEMinShape(11)],
  ),
  Db: chordMajMin(
    [chordCommon(['x', 1, 3, 3, 3, 1])(1)(4), barreCommonAMajShape(5)],
    [chordCommon(['x', 1, 3, 3, 2, 1])(1)(4), barreCommonAMinShape(5)],
  ),
  E: chordMajMin(
    [chordCommon([0, 2, 2, 1, 0, 0])(0)(0), barreCommonAMajShape(7)],
    [chordCommon([0, 2, 2, 0, 0, 0])(0)(0), barreCommonAMinShape(7)],
  ),
  Eb: chordMajMin(
    [chordCommon(['x', 'x', 1, 3, 4, 3])(0)(0), barreCommonAMajShape(7)],
    [chordCommon(['x', 1, 3, 3, 2, 1])(1)(6), barreCommonAMinShape(7)],
  ),
  F: chordMajMin(
    [chordCommon([1, 3, 3, 2, 1, 1])(1)(0), barreCommonAMajShape(8)],
    [chordCommon([1, 3, 3, 1, 1, 1])(1)(0), barreCommonAMinShape(8)],
  ),
  'F#': chordMajMin(
    [chordCommon([2, 4, 4, 3, 2, 2])(1)(0), barreCommonAMajShape(9)],
    [chordCommon([2, 4, 4, 2, 2, 2])(1)(0), barreCommonAMinShape(9)],
  ),
  G: chordMajMin(
    [chordCommon([3, 2, 0, 0, 0, 3])(0)(0), barreCommonEMajShape(3)],
    [chordCommon([1, 3, 3, 1, 1, 1])(1)(3), barreCommonAMinShape(10)],
  ),
  'G#': chordMajMin(
    [chordCommon([1, 3, 3, 2, 1, 1])(1)(4), barreCommonAMajShape(11)],
    [chordCommon([1, 3, 3, 1, 1, 1])(1)(4), barreCommonAMinShape(11)],
  ),
  Gb: chordMajMin(
    [chordCommon([2, 4, 4, 3, 2, 2])(1)(0), barreCommonEMajShape(3)],
    [chordCommon([2, 4, 4, 2, 2, 2])(1)(0), barreCommonAMinShape(10)],
  ),
};
