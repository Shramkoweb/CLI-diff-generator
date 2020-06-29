import yaml from 'js-yaml';
import ini from 'ini';
import isObject from 'lodash/isObject';
import reduce from 'lodash/reduce';

import { fileFormats } from './constants.js';

const parseIni = (data) => {
  const parsedData = ini.parse(data);

  const convertStringsToNumbers = (obj) => reduce(obj, (acc, value, key) => {
    if (isObject(value)) {
      acc[key] = convertStringsToNumbers(value);
      return acc;
    }

    /* ini библиотека во время парсинга подменяет числа на строки
    *  здесь я конвертирую строки в число, и если это например '11'
    * то мы получим число 11, иначе это другой типа
    * и мы его не трогаем */
    const parsed = parseInt(value, 10);
    if (parsed) {
      acc[key] = parsed;
      return acc;
    }

    acc[key] = obj[key];
    return acc;
  }, {});

  return convertStringsToNumbers(parsedData);
};

const PARSERS_MAPPING = {
  [fileFormats.JSON]: JSON.parse,
  [fileFormats.YAML]: yaml.safeLoad,
  [fileFormats.INI]: parseIni,
};

export default (data, format) => PARSERS_MAPPING[format](data);
