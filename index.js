import path from 'path';
import fs from 'fs';

import parse from './src/parsers.js';
import generateAst from './src/ast.js';
import format from './src/formaters/index.js';
import { getFileFormat } from './src/utils.js';

export default (firstFilePath, secondFilePath, formatName = 'stylish') => {
  const firstFileFormat = getFileFormat(path.extname(firstFilePath));
  const secondFileFormat = getFileFormat(path.extname(secondFilePath));
  const firstFileContent = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFileContent = fs.readFileSync(secondFilePath, 'utf-8');

  const firstFileData = parse(firstFileContent, firstFileFormat);
  const secondFileData = parse(secondFileContent, secondFileFormat);

  const ast = generateAst(firstFileData, secondFileData);

  return format(ast, formatName);
};
