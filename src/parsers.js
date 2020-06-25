import yaml from 'js-yaml';
import ini from 'ini';
import keys from 'lodash/keys';
import isObject from 'lodash/isObject';

const parseIni = (data) => {
  const parsedData = ini.parse(data);

  const convertStringsToNumbers = (obj) => keys(obj).reduce((acc, key) => {
    const value = obj[key];

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
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': parseIni,
};

export default (fileExtension) => PARSERS_MAPPING[fileExtension];
