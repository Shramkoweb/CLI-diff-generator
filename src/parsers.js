import yaml from 'js-yaml';
import ini from 'ini';
import _isObject from 'lodash/isObject';
import _reduce from 'lodash/reduce';

import { fileFormats } from './constants.js';

const parseIni = (data) => {
  const parsedData = ini.parse(data);

  const convertStringsToNumbers = (obj) => _reduce(obj, (acc, value, key) => {
    if (_isObject(value)) {
      return { ...acc, [key]: convertStringsToNumbers(value) };
    }

    /* ini библиотека во время парсинга подменяет числа на строки
    *  здесь я конвертирую строки в число, и если это например '11'
    * то мы получим число 11, иначе это другой типа
    * и мы его не трогаем */
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed)) {
      return { ...acc, [key]: parsed };
    }

    return { ...acc, [key]: obj[key] };
  }, {});

  return convertStringsToNumbers(parsedData);
};

const PARSERS_MAPPING = {
  [fileFormats.JSON]: JSON.parse,
  [fileFormats.YAML]: yaml.safeLoad,
  [fileFormats.INI]: parseIni,
};

export default (data, format) => PARSERS_MAPPING[format](data);
