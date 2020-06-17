import path from 'path';
import fs from 'fs';

import { compare } from '../src/cli/generate-diff';

const dirname = path.dirname(new URL(import.meta.url).pathname);

const beforePathToJSON = path.resolve(dirname, '__fixtures__/before.json');
const afterPathToJSON = path.resolve(dirname, '__fixtures__/after.json');
const resultPath = path.resolve(dirname, '__fixtures__/compareResult.txt');

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
