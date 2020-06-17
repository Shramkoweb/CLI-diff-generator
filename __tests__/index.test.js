import path from 'path';
import fs from 'fs';

import generateDiff from '../src/cli/generate-diff';

const dirname = path.dirname(new URL(import.meta.url).pathname);

const beforePathToJSON = path.resolve(dirname, '__fixtures__/before.json');
const afterPathToJSON = path.resolve(dirname, '__fixtures__/after.json');
const beforePathToYAML = path.resolve(dirname, '__fixtures__/before.yaml');
const afterPathToYAML = path.resolve(dirname, '__fixtures__/after.yaml');
const resultPath = path.resolve(dirname, '__fixtures__/compareResult.txt');

describe('Test generateDiff function', () => {
  test('Should correct compare JSON', () => {
    const firstFilePath = path.resolve(beforePathToJSON);
    const secondFilePath = path.resolve(afterPathToJSON);
    const resultFilePath = path.resolve(resultPath);

    expect(generateDiff(firstFilePath, secondFilePath))
      .toBe(fs.readFileSync(resultFilePath, 'utf-8'));
  });
  test('Should correct compare YAML', () => {
    const firstFilePath = path.resolve(beforePathToYAML);
    const secondFilePath = path.resolve(afterPathToYAML);
    const resultFilePath = path.resolve(resultPath);

    expect(generateDiff(firstFilePath, secondFilePath))
      .toBe(fs.readFileSync(resultFilePath, 'utf-8'));
  });
});
