import path from 'path';
import fs from 'fs';

import generateDiff from '../src/index';

// custom dirname
const dirname = path.dirname(new URL(import.meta.url).pathname);

// utils
const getFixturePath = (fileName) => path.resolve(dirname, '__fixtures__/', `${fileName}`);
const readFileContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8').trim();

describe('Test generateDiff function', () => {
  test.each([
    ['json'],
    ['yaml'],
    ['ini'],
  ])('generateDiff(%s)', (fileFormat) => {
    const pathToFile1 = getFixturePath(`before.${fileFormat}`);
    const pathToFile12 = getFixturePath(`after.${fileFormat}`);
    const expected = readFileContent(getFixturePath('stylishResult.txt'));

    expect(generateDiff(pathToFile1, pathToFile12, 'stylish')).toEqual(expected);
  });
});
