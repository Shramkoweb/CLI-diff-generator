import _ from 'lodash';

import { nodeState } from '../ast.js';

const singleIndentSpaceCount = 4;

const getIndent = (depth) => ' '.repeat(depth);

const makeStylishFormat = (diff, treeDepth = 0) => {
  const defaultIndentLength = treeDepth * singleIndentSpaceCount;

  const largeIndent = getIndent(defaultIndentLength + singleIndentSpaceCount);
  const nestedObjectIndent = getIndent((treeDepth + 1) * singleIndentSpaceCount + singleIndentSpaceCount);
  const smallIndent = getIndent(defaultIndentLength + singleIndentSpaceCount / 2);
  const nestedIdent = getIndent(defaultIndentLength);

  const stringify = (data, treeDepth) => {
    const stringifyObject = (object) => {
      const string = _.keys(object)
        .map((key) => `${nestedObjectIndent}${key}:  ${stringify(object[key])}`)
        .join('\n');

      return `{\n${string}\n${largeIndent}}`;
    };
    return _.isObject(data) ? stringifyObject(data) : `${data}`;
  };

  const nodeStateToFormatting = {
    [nodeState.added]: ({ name, value }, treeDepth) => {
      return `${smallIndent}+ ${name}: ${stringify(value, treeDepth)}`;
    },
    [nodeState.deleted]: ({ name, value }, treeDepth) => {
      return `${smallIndent}- ${name}: ${stringify(value, treeDepth)}`;
    },
    [nodeState.unchanged]: ({ name, value }, treeDepth) => {
      return `${largeIndent}${name}: ${stringify(value, treeDepth)}`;
    },
    [nodeState.nested]: ({ name, children }, treeDepth) => {
      return `${largeIndent}${name}: ${makeStylishFormat(children, treeDepth + 1)}`;
    },
    [nodeState.changed]: (node, treeDepth) => {
      const { name, addedValue, removedValue } = node;
      const addedString = nodeStateToFormatting[nodeState.added]({ name, value: addedValue }, treeDepth);
      const deletedString = nodeStateToFormatting[nodeState.deleted]({ name, value: removedValue }, treeDepth);

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
