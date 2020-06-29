import isObject from 'lodash/isObject.js';
import isString from 'lodash/isString.js';

import { nodeStates } from '../constants.js';

const stringify = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  return isString(value) ? `'${value}'` : value;
};

const makePlainFormat = (diff, path = '') => {
  const nodeStateToFormatting = {
    [nodeStates.ADDED]: (node) => `Property '${path}${node.name}' was added with value: ${stringify(node.value)}`,
    [nodeStates.DELETED]: (node) => `Property '${path}${node.name}' was deleted`,
    [nodeStates.NESTED]: (node) => makePlainFormat(node.children, `${path.concat(node.name, '.')}`),
    [nodeStates.CHANGED]: (node) => `Property '${path}${node.name}' was changed from ${stringify(node.removedValue)} to ${stringify(node.addedValue)}`,
    [nodeStates.UNCHANGED]: () => [],
  };

  return diff
    .flatMap((element) => nodeStateToFormatting[element.state](element))
    .join('\n');
};

export default makePlainFormat;
