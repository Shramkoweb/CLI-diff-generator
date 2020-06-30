import pretty from './stylish';
import makePlainFormat from './plain';

export const FORMATTERS_MAPPING = {
  stylish: pretty,
  plain: makePlainFormat,
  json: JSON.stringify,
};

export default (data, type) => FORMATTERS_MAPPING[type](data);
