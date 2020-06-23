import makeStylishFormat from './stylish.js';
import makePlainFormat from './plain.js';

export const FormatterType = {
  stylish: makeStylishFormat,
  plain: makePlainFormat,
  json: 'json',
};

export default (type, data) => FormatterType[type](data);
