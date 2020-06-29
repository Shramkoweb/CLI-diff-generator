import pretty from './stylish.js';
import makePlainFormat from './plain.js';

export const FORMATTERS_MAPPING = {
  stylish: pretty,
  plain: makePlainFormat,
  json: JSON.stringify,
};

export default (data, type) => FORMATTERS_MAPPING[type](data);
