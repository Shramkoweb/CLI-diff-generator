import generateDiff from './cli/generate-diff.js';
import _ from 'lodash';

const before = {
  'host': 'hexlet.io',
  'timeout': 50,
  'proxy': '123.234.53.22',
  'follow': false,
};

const after = {
  'timeout': 20,
  'verbose': true,
  'host': 'hexlet.io',
};

const firstObjectKeys = Object.keys(before);
const secondObjectKeys = Object.keys(after);

const unitedKeys = _.union(firstObjectKeys, secondObjectKeys);
console.log(unitedKeys);
// {
// host: hexlet.io
// + timeout: 20
// - timeout: 50
// - proxy: 123.234.53.22
// + verbose: true
// - follow: false
// }

const compared = unitedKeys.reduce((accumulator, currentKey) => {
  // если ключи есть в обоих объектах
  if (_.has(before, currentKey) && _.has(after, currentKey)) {
    // если они совпадают возвращает строку без изменений
    if (before[currentKey] === after[currentKey]) {
      return [...accumulator, `  ${currentKey}: ${before[currentKey]}`];
    }

    // иначе у первого изменения есть флаг -, а у второго +
    return [...accumulator, `  - ${currentKey}: ${before[currentKey]}`, `  + ${currentKey}:${after[currentKey]}`];
  }

  if (_.has(before, currentKey)) {
    return [...accumulator, `  - ${currentKey}: ${before[currentKey]}`];
  }

  return [...accumulator, `  + ${currentKey}: ${after[currentKey]}`];
}, []);

const result = ['{', ...compared, '}\n'].join('\n');

console.log(result);

export default generateDiff;
