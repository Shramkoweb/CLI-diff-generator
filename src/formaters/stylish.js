import _ from 'lodash';
import generateAst, { nodeState } from '../ast.js';

const second = {
  'common': {
    'follow': false,
    'setting1': 'Value 1',
    'setting3': {
      'key': 'value'
    },
    'setting4': 'blah blah',
    'setting5': {
      'key5': 'value5'
    },
    'setting6': {
      'key': 'value',
      'ops': 'vops'
    }
  },
  'group1': {
    'foo': 'bar',
    'baz': 'bars',
    'nest': 'str'
  },
  'group3': {
    'fee': 100500
  }
};

const first = {
  'common': {
    'setting1': 'Value 1',
    'setting2': 200,
    'setting3': true,
    'setting6': {
      'key': 'value'
    }
  },
  'group1': {
    'baz': 'bas',
    'foo': 'bar',
    'nest': {
      'key': 'value'
    }
  },
  'group2': {
    'abc': 12345
  }
};

const ident = ' '.repeat(4);

const stringify = (data, treeDepth) => {
  const stringifyObject = (object) => {
    const string = _.keys(object)
      .map((key) => `${key}:  ${stringify(object[key])}`)
      .join('\n');

    return `{${string}}`;
  };
  return _.isObject(data) ? stringifyObject(data) : `${data}`;
};

const nodeStateToFormatting = {
  [nodeState.added]: ({ name, value }, treeDepth) => `+${name}: ${stringify(value, treeDepth)}`,
  [nodeState.deleted]: ({ name, value }, treeDepth) => `-${name}: ${stringify(value, treeDepth)}`,
  [nodeState.unchanged]: ({ name, value }, treeDepth) => `${name}: ${stringify(value, treeDepth)}`,
  [nodeState.nested]: ({ name, children }, treeDepth) => `${name}: ${makeStylishFormat(children, treeDepth + 1)}`,
  [nodeState.changed]: (node, treeDepth) => {
    const { name, addedValue, removedValue } = node;
    const addedString = nodeStateToFormatting[nodeState.added]({ name, value: addedValue });
    const deletedString = nodeStateToFormatting[nodeState.deleted]({ name, value: removedValue });

    return [addedString, deletedString];
  },
};

const makeStylishFormat = (diff, treeDepth = 0) => {
  const formattedDiff = diff
    .map((element) => nodeStateToFormatting[element.state](element, treeDepth))
    .flat()
    .join('\n');

  return `{\n${formattedDiff}\n}`;
};

console.log(makeStylishFormat(generateAst(first, second)));
export default makeStylishFormat;
