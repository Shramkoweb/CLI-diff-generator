import { getFixtureContent, getFixturePath } from '../src/utils';

import generateDiff from '../src/index';

describe('Test generateDiff function', () => {
  let referenceResult;
  const testData = ['json', 'yaml', 'ini'];

  beforeAll(() => {
    referenceResult = {
      stylish: getFixtureContent('stylishResult.txt'),
      plain: getFixtureContent('plainResult.txt'),
      json: getFixtureContent('jsonResult.txt'),
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
