import _ from 'lodash';
// не очень нравится то что ф-я называется parsers но при дефолтном
// экспорте вроде не очень менять именование
import parsers from '../parsers.js';

export const compare = (firstFile, secondFile) => {
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
      return [...accumulator, `  - ${currentKey}: ${firstFile[currentKey]}`, `  + ${currentKey}: ${secondFile[currentKey]}`];
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
export default (firstFilePath, secondFilePath) => {
  const firstFile = parsers(firstFilePath);
  const secondFile = parsers(secondFilePath);

  return compare(firstFile, secondFile);
};
