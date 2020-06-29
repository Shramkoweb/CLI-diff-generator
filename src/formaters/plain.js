import _isObject from 'lodash/isObject.js';
import _isString from 'lodash/isString.js';

import { nodeStates } from '../constants.js';

const stringify = (value) => {
  if (_isObject(value)) {
    return '[complex value]';
  }

  return _isString(value) ? `'${value}'` : value;
};

const formatNodes = (nodes, path = '') => {
  const nodeStateToFormatting = {
    [nodeStates.ADDED]: (node) => `Property '${path}${node.name}' was added with value: ${stringify(node.value)}`,
    [nodeStates.DELETED]: (node) => `Property '${path}${node.name}' was deleted`,
    [nodeStates.NESTED]: (node) => formatNodes(node.children, `${path.concat(node.name, '.')}`),
    [nodeStates.CHANGED]: (node) => `Property '${path}${node.name}' was changed from ${stringify(node.removedValue)} to ${stringify(node.addedValue)}`,
    [nodeStates.UNCHANGED]: () => [],
  };

  return nodes.flatMap((element) => nodeStateToFormatting[element.state](element)).join('\n');
};

const makePlainFormat = (diff) => formatNodes(diff);

export default makePlainFormat;
