import _ from 'lodash';

import { nodeState } from '../ast.js';

const stringify = (value) => {
  const formattedData = (typeof value === 'string') ? `'${value}'` : value;
  return (_.isObject(value)) ? '[complex value]' : formattedData;
};

const makePlainFormat = (diff, path = '') => {
  const nodeStateToFormatting = {
    [nodeState.added]: (node) => `Property '${path}${node.name}' was added with value: ${stringify(node.value)}`,
    [nodeState.deleted]: (node) => `Property '${path}${node.name}' was deleted`,
    [nodeState.nested]: (node) => makePlainFormat(node.children, `${path.concat(node.name, '.')}`),
    [nodeState.changed]: (node) => `Property '${path}${node.name}' was changed from ${stringify(node.removedValue)} to ${stringify(node.addedValue)}`,
    [nodeState.unchanged]: () => [],
  };

  const formattedDiff = diff
    .map((element) => nodeStateToFormatting[element.state](element))
    .flat()
    .join('\n');

  return `${formattedDiff}`;
};

export default makePlainFormat;
