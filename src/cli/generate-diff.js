import commander from 'commander';

import packageJsonFile from '../../package.json';

const generateDiff = (processArgv) => {
  commander
    .version(packageJsonFile.version)
    .description(packageJsonFile.description);

  commander.parse(processArgv);
};

export default generateDiff;
