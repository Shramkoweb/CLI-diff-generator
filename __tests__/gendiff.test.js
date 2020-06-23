import path from 'path';
import fs from 'fs';
import { beforeAll, describe, expect } from '@jest/globals';

import generateDiff from '../src/index';

// custom dirname
const dirname = path.dirname(new URL(import.meta.url).pathname);

// utils
const getFixturePath = (fileName) => path.resolve(dirname, '__fixtures__/', `${fileName}`);
const readFileContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8').trim();

describe('Test generateDiff function', () => {
  // TODO REFACTOR ?
  let testResults;
  const testData = ['json', 'yaml', 'ini'];

  beforeAll(() => {
    testResults = {
      stylish: readFileContent('stylishResult.txt'),
      plain: readFileContent('plainResult.txt'),
      json: readFileContent('jsonResult.txt'),
    };
  });

  test.each(testData)('generateDiff (%s)', (fileFormat) => {
    const pathToFile1 = getFixturePath(`before.${fileFormat}`);
    const pathToFile2 = getFixturePath(`after.${fileFormat}`);

    expect(generateDiff(pathToFile1, pathToFile2, 'stylish')).toBe(testResults.stylish);
    expect(generateDiff(pathToFile1, pathToFile2, 'plain')).toBe(testResults.plain);
    expect(generateDiff(pathToFile1, pathToFile2, 'json')).toBe(testResults.json);
  });
});
