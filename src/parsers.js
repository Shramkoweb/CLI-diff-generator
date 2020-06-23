import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
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

// TODO parser should not know about filePath refactor to pure func
export default (filePath) => {
  const fileExtension = path.extname(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  return ParserType[fileExtension](content);
};
