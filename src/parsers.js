import yaml from 'js-yaml';
import ini from 'ini';
import _isObject from 'lodash/isObject.js';
import _reduce from 'lodash/reduce.js';

import { fileFormats } from './constants.js';

const parseIni = (data) => {
  const parsedData = ini.parse(data);

  const convertStringsToNumbers = (obj) => _reduce(obj, (acc, value, key) => {
    const accumulator = { ...acc };

    if (_isObject(value)) {
      accumulator[key] = convertStringsToNumbers(value);
      return accumulator;
    }

    /* ini библиотека во время парсинга подменяет числа на строки
    *  здесь я конвертирую строки в число, и если это например '11'
    * то мы получим число 11, иначе это другой типа
    * и мы его не трогаем */
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed)) {
      accumulator[key] = parsed;
      return accumulator;
    }

    accumulator[key] = obj[key];
    return accumulator;
  }, {});

  return convertStringsToNumbers(parsedData);
};

const PARSERS_MAPPING = {
  [fileFormats.JSON]: JSON.parse,
  [fileFormats.YAML]: yaml.safeLoad,
  [fileFormats.INI]: parseIni,
};

export default (data, format) => PARSERS_MAPPING[format](data);
