import _keys from 'lodash/keys.js';
import _isObject from 'lodash/isObject.js';

import { nodeStates } from '../constants.js';

const indentSize = 4;

const getIndent = (depth) => ' '.repeat(depth);

const stringify = (data, treeDepth) => {
  const beforeKeyIndent = getIndent((treeDepth + 1) * indentSize + indentSize);
  const closeBracketIndent = getIndent(treeDepth * indentSize + indentSize);

  const stringifyObject = (object) => {
    const string = _keys(object)
      .map((key) => `${beforeKeyIndent}${key}:  ${stringify(object[key], treeDepth)}`)
      .join('\n');

    return `{\n${string}\n${closeBracketIndent}}`;
  };
  return _isObject(data) ? stringifyObject(data) : `${data}`;
};

const formatNode = (node, treeDepth, pretty) => {
  const defaultIndentLength = treeDepth * indentSize;
  const largeIndent = getIndent(defaultIndentLength + indentSize);
  const smallIndent = getIndent(defaultIndentLength + indentSize / 2);

  const nodeStateToFormatting = {
    [nodeStates.ADDED]: ({ name, value }) => `${smallIndent}+ ${name}: ${stringify(value, treeDepth)}`,
    [nodeStates.DELETED]: ({ name, value }) => `${smallIndent}- ${name}: ${stringify(value, treeDepth)}`,
    [nodeStates.UNCHANGED]: ({ name, value }) => `${largeIndent}${name}: ${stringify(value, treeDepth)}`,
    [nodeStates.NESTED]: ({ name, children }) => `${largeIndent}${name}: ${pretty(children, treeDepth + 1)}`,
    [nodeStates.CHANGED]: ({ name, addedValue, removedValue }) => {
      const getAddString = nodeStateToFormatting[nodeStates.ADDED];
      const getRemovedString = nodeStateToFormatting[nodeStates.DELETED];

      const addedString = getAddString({ name, value: addedValue }, treeDepth);
      const deletedString = getRemovedString({ name, value: removedValue }, treeDepth);

      return [addedString, deletedString];
    },
  };

  return nodeStateToFormatting[node.state](node);
};

const pretty = (diff, treeDepth = 0) => {
  const nestedIdent = getIndent(treeDepth * indentSize);

  const formattedDiff = diff
    .flatMap((element) => formatNode(element, treeDepth, pretty))
    .join('\n');

  return `{\n${formattedDiff}\n${nestedIdent}}`;
};

export default pretty;
