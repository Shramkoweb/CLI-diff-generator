import union from 'lodash/union';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import has from 'lodash/has';
import { nodeStates } from './constants.js';

const generateAst = (firstData, secondData) => {
  const unitedKeys = union(keys(firstData), keys(secondData));

  return unitedKeys.map((key) => {
    const firstValue = firstData[key];
    const secondValue = secondData[key];

    if (isObject(firstValue) && isObject(secondValue)) {
      return {
        name: key,
        state: nodeStates.NESTED,
        children: generateAst(firstValue, secondValue),
      };
    }

    if (has(firstData, key) && !has(secondData, key)) {
      return {
        name: key,
        state: nodeStates.DELETED,
        value: firstValue,
      };
    }

    if (has(secondData, key) && !has(firstData, key)) {
      return {
        name: key,
        state: nodeStates.ADDED,
        value: secondValue,
      };
    }

    if (firstValue === secondValue) {
      return {
        name: key,
        state: nodeStates.UNCHANGED,
        value: firstValue,
      };
    }

    return {
      name: key,
      state: nodeStates.CHANGED,
      removedValue: firstValue,
      addedValue: secondValue,
    };
  });
};

export default generateAst;
