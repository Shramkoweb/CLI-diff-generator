import path from 'path';
import fs from 'fs';

import getParser from './parsers.js';
import generateAst from './ast.js';
import makeFormat from './formaters/index.js';

export default (firstFilePath, secondFilePath, format) => {
  const firstFileExtension = path.extname(firstFilePath);
  const secondFileExtension = path.extname(secondFilePath);
  const firstFileContent = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFileContent = fs.readFileSync(secondFilePath, 'utf-8');

  const firstData = getParser(firstFileExtension)(firstFileContent);
  const secondData = getParser(secondFileExtension)(secondFileContent);

  const ast = generateAst(firstData, secondData);

  return makeFormat(ast, format);
};
