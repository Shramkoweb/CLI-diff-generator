import path from 'path';
import fs from 'fs';

import getParser from './parsers.js';
import generateAst from './ast.js';
import makeFormat from './formaters/index.js';
import { getFileFormat } from './utils.js';

export default (firstFilePath, secondFilePath, format) => {
  const firstFileFormat = getFileFormat(path.extname(firstFilePath));
  const secondFileFormat = getFileFormat(path.extname(secondFilePath));
  const firstFileContent = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFileContent = fs.readFileSync(secondFilePath, 'utf-8');

  const firstData = getParser(firstFileFormat)(firstFileContent);
  const secondData = getParser(secondFileFormat)(secondFileContent);

  const ast = generateAst(firstData, secondData);

  return makeFormat(ast, format);
};
