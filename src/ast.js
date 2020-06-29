import union from 'lodash/union.js';
import isObject from 'lodash/isObject.js';
import keys from 'lodash/keys.js';
import has from 'lodash/has.js';
import { nodeStates } from './constants.js';

const generateAst = (firstData, secondData) => {
  const unitedKeys = union(keys(firstData), keys(secondData)).sort();

  return unitedKeys.map((key) => {
    const firstValue = firstData[key];
    const secondValue = secondData[key];

    if (!has(secondData, key)) {
      return {
        name: key,
        state: nodeStates.DELETED,
        value: firstValue,
      };
    }

    if (!has(firstData, key)) {
      return {
        name: key,
        state: nodeStates.ADDED,
        value: secondValue,
      };
    }

    if (isObject(firstValue) && isObject(secondValue)) {
      return {
        name: key,
        state: nodeStates.NESTED,
        children: generateAst(firstValue, secondValue),
      };
    }

    if (firstValue !== secondValue) {
      return {
        name: key,
        state: nodeStates.CHANGED,
        removedValue: firstValue,
        addedValue: secondValue,
      };
    }

    return {
      name: key,
      state: nodeStates.UNCHANGED,
      value: firstValue,
    };
  });
};

export default generateAst;
