import path from 'path';
import fs from 'fs';

import { compare } from '../src/cli/generate-diff';

// TODO refactor to __dirname
const beforePathToJSON = '__tests__/__fixtures__/before.json';
const afterPathToJSON = '__tests__/__fixtures__/after.json';
const resultPath = '__tests__/__fixtures__/compareResult.txt';

describe('Test compare function', () => {
  test('Shouldd correct compare flat Json object', () => {
    const firstFilePath = path.resolve(beforePathToJSON);
    const secondFilePath = path.resolve(afterPathToJSON);
    const resultFilePath = path.resolve(resultPath);

    const firstFile = JSON.parse(fs.readFileSync(firstFilePath));
    const secondFile = JSON.parse(fs.readFileSync(secondFilePath));

    expect(compare(firstFile, secondFile)).toBe(fs.readFileSync(resultFilePath, 'utf-8'));
  });
});
