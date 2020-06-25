import _ from 'lodash';

export const nodeStates = {
  ADDED: 'added',
  DELETED: 'deleted',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
  CHANGED: 'changed',
};

const generateAst = (firstData, secondData) => {
  const unitedKeys = _.union(_.keys(firstData), _.keys(secondData));

  return unitedKeys.map((key) => {
    const firstValue = firstData[key];
    const secondValue = secondData[key];

    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return {
        name: key,
        state: nodeStates.NESTED,
        children: generateAst(firstValue, secondValue),
      };
    }

    if (_.has(firstData, key) && !_.has(secondData, key)) {
      return {
        name: key,
        state: nodeStates.DELETED,
        value: firstValue,
      };
    }

    if (_.has(secondData, key) && !_.has(firstData, key)) {
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
