import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

const ParserType = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

// TODO parser should not know about filePath refactor to pure func
export default (filePath) => {
  const fileExtension = path.extname(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  return ParserType[fileExtension](content);
};
