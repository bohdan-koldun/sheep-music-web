/* eslint-disable react/no-this-in-sfc */
export default {
  keys: [
    { name: 'Ab', value: 0, type: 'F' },
    { name: 'A', value: 1, type: 'N' },
    { name: 'A#', value: 2, type: 'S' },
    { name: 'Bb', value: 2, type: 'F' },
    { name: 'B', value: 3, type: 'N' },
    { name: 'C', value: 4, type: 'N' },
    { name: 'C#', value: 5, type: 'S' },
    { name: 'Db', value: 5, type: 'F' },
    { name: 'D', value: 6, type: 'N' },
    { name: 'D#', value: 7, type: 'S' },
    { name: 'Eb', value: 7, type: 'F' },
    { name: 'E', value: 8, type: 'N' },
    { name: 'F', value: 9, type: 'N' },
    { name: 'F#', value: 10, type: 'S' },
    { name: 'Gb', value: 10, type: 'F' },
    { name: 'G', value: 11, type: 'N' },
    { name: 'G#', value: 0, type: 'S' },
  ],

  getKeyByName(name) {
    const { keys } = this;
    let chordName = name;
    if (name && name.charAt(name.length - 1) === 'm') {
      chordName = name.substring(0, name.length - 1);
    }
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] && chordName === keys[i].name) {
        return keys[i];
      }
    }
    return null;
  },

  getNewKey(oldKey, delta, targetKey) {
    const { keys } = this;
    const key = this.getKeyByName(oldKey) || {};
    let keyValue = key.value + delta;

    if (keyValue > 11) {
      keyValue -= 12;
    } else if (keyValue < 0) {
      keyValue += 12;
    }

    let i = 0;
    if (
      keyValue === 0 ||
      keyValue === 2 ||
      keyValue === 5 ||
      keyValue === 7 ||
      keyValue === 10
    ) {
      switch (targetKey && targetKey.name) {
        case 'A':
        case 'A#':
        case 'B':
        case 'C':
        case 'C#':
        case 'D':
        case 'D#':
        case 'E':
        case 'F#':
        case 'G':
        case 'G#': {
          for (; i < keys.length; i += 1)
            if (keys[i] && keys[i].value === keyValue && keys[i].type === 'S') {
              return keys[i];
            }
          break;
        }
        default:
          for (; i < keys.length; i += 1) {
            if (keys[i] && keys[i].value === keyValue && keys[i].type === 'F') {
              return keys[i];
            }
          }
      }
    }
    for (; i < keys.length; i += 1) {
      if (keys[i] && keys[i].value === keyValue) {
        return keys[i];
      }
    }
    return null;
  },

  getDelta(oldIndex, newIndex) {
    if (oldIndex > newIndex) return 0 - (oldIndex - newIndex);
    if (oldIndex < newIndex) return 0 + (newIndex - oldIndex);
    return 0;
  },

  getChordRoot(input) {
    if (
      input.length > 1 &&
      (input && (input.charAt(1) === 'b' || input.charAt(1) === '#'))
    )
      return input.substr(0, 2);
    return input.substr(0, 1);
  },

  getChordType(key) {
    switch (key && key.charAt(key.length - 1)) {
      case 'b':
        return 'F';
      case '#':
        return 'S';
      default:
        return 'N';
    }
  },
};
