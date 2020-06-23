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
  let referenceResult;
  const testData = ['json', 'yaml', 'ini'];

  beforeAll(() => {
    referenceResult = {
      stylish: readFileContent('stylishResult.txt'),
      plain: readFileContent('plainResult.txt'),
      json: readFileContent('jsonResult.txt'),
    };
  });

  test.each(testData)('generateDiff (%s)', (fileFormat) => {
    const pathToFile1 = getFixturePath(`before.${fileFormat}`);
    const pathToFile2 = getFixturePath(`after.${fileFormat}`);

    const expectedResult = {
      stylish: generateDiff(pathToFile1, pathToFile2, 'stylish'),
      plain: generateDiff(pathToFile1, pathToFile2, 'plain'),
      json: generateDiff(pathToFile1, pathToFile2, 'json'),
    };

    expect(expectedResult.stylish).toBe(referenceResult.stylish);
    expect(expectedResult.plain).toBe(referenceResult.plain);
    expect(expectedResult.json).toBe(referenceResult.json);
  });
});
