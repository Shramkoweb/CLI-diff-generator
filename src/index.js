import path from 'path';
import fs from 'fs';

import parse from './parsers.js';
import generateAst from './ast.js';
import format from './formaters/index.js';
import { getFileFormat } from './utils.js';

export default (firstFilePath, secondFilePath, formatName = 'stylish') => {
  const firstFileFormat = getFileFormat(path.extname(firstFilePath));
  const secondFileFormat = getFileFormat(path.extname(secondFilePath));
  const firstFileContent = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFileContent = fs.readFileSync(secondFilePath, 'utf-8');

  const firstFileData = parse(firstFileFormat, firstFileContent);
  const secondFileData = parse(secondFileFormat, secondFileContent);

  const ast = generateAst(firstFileData, secondFileData);

  return format(ast, formatName);
};
