import path from 'path';
import fs from 'fs';

import generateDiff from '../src/cli/generate-diff';
import makeStylishFormat from '../src/formaters/stylish';
import generateAst from '../src/ast';

// utils
const dirname = path.dirname(new URL(import.meta.url).pathname);
const getFixturePath = (fileName) => path.resolve(dirname, '__fixtures__/', `${fileName}`);
const readFileContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

describe('Test generateDiff function', () => {
  test.each([
    ['json'],
    ['yaml'],
    ['ini'],
  ])('generateDiff(%s)', (fileFormat) => {
    const pathToFile1 = getFixturePath(`before.${fileFormat}`);
    const pathToFile12 = getFixturePath(`after.${fileFormat}`);
    const expected = readFileContent(getFixturePath('compareResult.txt'));

    expect(generateDiff(pathToFile1, pathToFile12)).toEqual(expected);
  });

  test('asdas', () => {

    const pathToFile1 = getFixturePath(`before-nested.json`);
    const pathToFile12 = getFixturePath(`after-nested.json`);
    const expected = readFileContent(getFixturePath('compareResult.txt'));

    expect(makeStylishFormat(generateAst(pathToFile1, pathToFile12))).toEqual(expected);
  });
});
