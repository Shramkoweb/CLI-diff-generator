import _union from 'lodash/union.js';
import _isObject from 'lodash/isObject.js';
import _keys from 'lodash/keys.js';
import _has from 'lodash/has.js';
import { nodeStates } from './constants.js';

const generateAst = (firstData, secondData) => {
  const keys = _union(_keys(firstData), _keys(secondData)).sort();

  return keys.map((key) => {
    const firstValue = firstData[key];
    const secondValue = secondData[key];

    if (!_has(secondData, key)) {
      return {
        name: key,
        state: nodeStates.DELETED,
        value: firstValue,
      };
    }

    if (!_has(firstData, key)) {
      return {
        name: key,
        state: nodeStates.ADDED,
        value: secondValue,
      };
    }

    if (_isObject(firstValue) && _isObject(secondValue)) {
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
