import _ from 'lodash';

import { nodeStates } from '../ast.js';

const stringify = (value) => {
  const formattedData = (typeof value === 'string') ? `'${value}'` : value;
  return (_.isObject(value)) ? '[complex value]' : formattedData;
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
