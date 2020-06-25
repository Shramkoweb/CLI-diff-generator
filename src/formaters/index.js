import makeStylishFormat from './stylish.js';
import makePlainFormat from './plain.js';

export const FORMATTERS_MAPPING = {
  stylish: makeStylishFormat,
  plain: makePlainFormat,
  json: JSON.stringify,
};

export default (data, type) => FORMATTERS_MAPPING[type](data);
