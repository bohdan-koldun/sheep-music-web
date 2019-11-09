export function titleCase(str) {
  if (!str) return null;
  const newStr = str.toLowerCase().split(' ');
  for (let i = 0; i < newStr.length; i += 1) {
    newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].slice(1);
  }
  return newStr.join(' ');
}
