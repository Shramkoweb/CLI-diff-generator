import commander from 'commander';
import fs from 'fs';
import _ from 'lodash';

import packageJsonFile from '../../package.json';

const compare = (firstFile, secondFile) => {
  const firstObjectKeys = Object.keys(firstFile);
  const secondObjectKeys = Object.keys(secondFile);

  // Получаем массив уникальных ключей в множестве
  const unitedKeys = _.union(firstObjectKeys, secondObjectKeys);

  const compared = unitedKeys.reduce((accumulator, currentKey) => {
    // если ключи есть в обоих объектах
    if (_.has(firstFile, currentKey) && _.has(secondFile, currentKey)) {
      // если они совпадают возвращает строку без изменений
      if (firstFile[currentKey] === secondFile[currentKey]) {
        return [...accumulator, `  ${currentKey}: ${firstFile[currentKey]}`];
      }

      // иначе у первого изменения есть флаг -, а у второго +
      return [...accumulator, `  - ${currentKey}: ${firstFile[currentKey]}`, `  + ${currentKey}:${secondFile[currentKey]}`];
    }

    // если у первого есть ключ, а у второго нет
    // так как проверкой выше мы исключили наличие во втором - значит ключ удален
    if (_.has(firstFile, currentKey)) {
      return [...accumulator, `  - ${currentKey}: ${firstFile[currentKey]}`];
    }

    // иначе он добавлен(так как во множестве ключи второго файла идут в конце)
    return [...accumulator, `  + ${currentKey}: ${secondFile[currentKey]}`];
  }, []);

  return ['{', ...compared, '}\n'].join('\n');
};

const generateDiff = (processArgv) => {
  commander
    .version(packageJsonFile.version)
    .description(packageJsonFile.description)
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((firstFilePath, secondFilePath) => {
      const firstFile = JSON.parse(fs.readFileSync(firstFilePath));
      const secondFile = JSON.parse(fs.readFileSync(secondFilePath));

      console.log(compare(firstFile, secondFile));
    });

  commander.parse(processArgv);
};

export default generateDiff;
