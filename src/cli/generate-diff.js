import commander from 'commander';

import packageJsonFile from '../../package.json';

const generateDiff = (processArgv) => {
  commander
    .version(packageJsonFile.version)
    .description(packageJsonFile.description)
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log('test: ', filepath1, filepath2);
    });

  commander.parse(processArgv);
};

export default generateDiff;
