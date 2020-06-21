import _ from 'lodash';

export const nodeState = {
  added: 'added',
  deleted: 'deleted',
  unchanged: 'unchanged',
  nested: 'nested',
  changed: 'changed',
};

const generateAst = (firstData, secondData) => {
  // Получаем массив уникальных ключей в множестве
  const unitedKeys = _.union(_.keys(firstData), _.keys(secondData)).sort();

  // Создание AST дерева
  return unitedKeys.map((key) => {
    const firstValue = firstData[key];
    const secondValue = secondData[key];

    // Рекурсивно итерируемся если оба ключа объекты
    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return {
        name: key,
        state: nodeState.nested,
        children: generateAst(firstValue, secondValue),
      };
    }

    // Есть в первом но нет во втором - ключ был удален/изменен
    if (_.has(firstData, key) && !_.has(secondData, key)) {
      return {
        name: key,
        state: nodeState.deleted,
        value: firstValue,
      };
    }

    // Есть во втором но нет в первом- ключ был добавлен
    if (_.has(secondData, key) && !_.has(firstData, key)) {
      return {
        name: key,
        state: nodeState.added,
        value: secondValue,
      };
    }

    // Есть во втором но нет в первом- ключ был добавлен
    if (firstValue === secondValue) {
      return {
        name: key,
        state: nodeState.unchanged,
        value: firstValue,
      };
    }

    // ключ был изменен в обоих объектах
    return {
      name: key,
      state: nodeState.changed,
      removedValue: firstValue,
      addedValue: secondValue,
    };
  });
};

export default generateAst;
