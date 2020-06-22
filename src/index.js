import parsers from './parsers.js';
import generateAst from './ast.js';
import formatter from './formaters/index.js';

export default (firstFilePath, secondFilePath, format) => {
  const firstFile = parsers(firstFilePath);
  const secondFile = parsers(secondFilePath);
  const ast = generateAst(firstFile, secondFile);

  return formatter(format, ast);
};
