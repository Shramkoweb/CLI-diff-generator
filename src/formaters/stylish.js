import _ from 'lodash';

import { nodeState } from '../ast.js';

const indentSize = 4;

const getIndent = (depth) => ' '.repeat(depth);

const makeStylishFormat = (diff, treeDepth = 0) => {
  const defaultIndentLength = treeDepth * indentSize;

  const largeIndent = getIndent(defaultIndentLength + indentSize);
  const nestedObjectIndent = getIndent((treeDepth + 1) * indentSize + indentSize);
  const smallIndent = getIndent(defaultIndentLength + indentSize / 2);
  const nestedIdent = getIndent(defaultIndentLength);

  const stringify = (data) => {
    const stringifyObject = (object) => {
      const string = _.keys(object)
        .map((key) => `${nestedObjectIndent}${key}:  ${stringify(object[key])}`)
        .join('\n');

      return `{\n${string}\n${largeIndent}}`;
    };
    return _.isObject(data) ? stringifyObject(data) : `${data}`;
  };

  const nodeStateToFormatting = {
    [nodeState.added]: ({ name, value }) => `${smallIndent}+ ${name}: ${stringify(value, treeDepth)}`,
    [nodeState.deleted]: ({ name, value }) => `${smallIndent}- ${name}: ${stringify(value, treeDepth)}`,
    [nodeState.unchanged]: ({ name, value }) => `${largeIndent}${name}: ${stringify(value, treeDepth)}`,
    [nodeState.nested]: ({ name, children }) => `${largeIndent}${name}: ${makeStylishFormat(children, treeDepth + 1)}`,
    [nodeState.changed]: (node) => {
      const { name, addedValue, removedValue } = node;
      const getAddString = nodeStateToFormatting[nodeState.added];
      const getRemovedString = nodeStateToFormatting[nodeState.deleted];

      const addedString = getAddString({ name, value: addedValue }, treeDepth);
      const deletedString = getRemovedString({ name, value: removedValue }, treeDepth);

      return [addedString, deletedString];
    },
  };

  const formattedDiff = diff
    .map((element) => nodeStateToFormatting[element.state](element, treeDepth))
    .flat()
    .join('\n');

  return `{\n${formattedDiff}\n${nestedIdent}}`;
};

export default makeStylishFormat;
