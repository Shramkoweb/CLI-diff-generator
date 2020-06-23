import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const iniParse = (data) => {
  const parsedData = ini.parse(data);

  const checkNumbers = (obj) => {
    const keys = _.keys(obj);

    return keys.reduce((acc, key) => {
      const value = obj[key];

      if (_.isObject(value)) {
        acc[key] = checkNumbers(value);
        return acc;
      }

      if (Number(value) && !_.isBoolean(value)) {
        acc[key] = Number(value);
        return acc;
      }

      acc[key] = obj[key];
      return acc;
    }, {});
  };

  return checkNumbers(parsedData);
};

const ParserType = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': iniParse,
};

export default (fileExtension) => ParserType[fileExtension];
