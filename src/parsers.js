import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const ParserType = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
};

export default (filePath) => {
  const fileExtension = path.extname(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  return ParserType[fileExtension](content);
};
