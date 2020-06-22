import makeStylishFormat from './stylish.js';

export const FormatterType = {
  stylish: makeStylishFormat,
  plain: 'plain',
  json: 'json',
};

export default (type, data) => FormatterType[type](data);
