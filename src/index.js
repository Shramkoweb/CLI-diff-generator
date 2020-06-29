import path from 'path';
import fs from 'fs';

import getParser from './parsers.js';
import generateAst from './ast.js';
import format from './formaters/index.js';
import { getFileFormat } from './utils.js';

export default (firstFilePath, secondFilePath, formatName = 'stylish') => {
  const firstFileFormat = getFileFormat(path.extname(firstFilePath));
  const secondFileFormat = getFileFormat(path.extname(secondFilePath));
  const firstFileContent = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFileContent = fs.readFileSync(secondFilePath, 'utf-8');

  const firstFileData = getParser(firstFileFormat)(firstFileContent);
  const secondFileData = getParser(secondFileFormat)(secondFileContent);

  const ast = generateAst(firstFileData, secondFileData);

  return format(ast, formatName);
};
