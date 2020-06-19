import path from 'path';
import fs from 'fs';

import generateDiff from '../src/cli/generate-diff';

const dirname = path.dirname(new URL(import.meta.url).pathname);

// json
const beforePathToJSON = path.resolve(dirname, '__fixtures__/before.json');
const afterPathToJSON = path.resolve(dirname, '__fixtures__/after.json');
// yaml
const beforePathToYAML = path.resolve(dirname, '__fixtures__/before.yaml');
const afterPathToYAML = path.resolve(dirname, '__fixtures__/after.yaml');
// ini
const beforePathToINI = path.resolve(dirname, '__fixtures__/before.ini');
const afterPathToINI = path.resolve(dirname, '__fixtures__/after.ini');

// reference result
const resultPath = path.resolve(dirname, '__fixtures__/compareResult.txt');

describe('Test generateDiff function', () => {
  test('Should correct compare .json', () => {
    const firstFilePath = path.resolve(beforePathToJSON);
    const secondFilePath = path.resolve(afterPathToJSON);
    const resultFilePath = path.resolve(resultPath);

    expect(generateDiff(firstFilePath, secondFilePath))
      .toBe(fs.readFileSync(resultFilePath, 'utf-8'));
  });

  test('Should correct compare .yaml', () => {
    const firstFilePath = path.resolve(beforePathToYAML);
    const secondFilePath = path.resolve(afterPathToYAML);
    const resultFilePath = path.resolve(resultPath);

    expect(generateDiff(firstFilePath, secondFilePath))
      .toBe(fs.readFileSync(resultFilePath, 'utf-8'));
  });

  test('Should correct compare .ini', () => {
    const firstFilePath = path.resolve(beforePathToINI);
    const secondFilePath = path.resolve(afterPathToINI);
    const resultFilePath = path.resolve(resultPath);

    expect(generateDiff(firstFilePath, secondFilePath))
      .toBe(fs.readFileSync(resultFilePath, 'utf-8'));
  });
});
