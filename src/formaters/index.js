import makeStylishFormat from './stylish.js';
import makePlainFormat from './plain.js';

export const FormatterType = {
  stylish: makeStylishFormat,
  plain: makePlainFormat,
  json: JSON.stringify,
};

export default (type, data) => FormatterType[type](data);
