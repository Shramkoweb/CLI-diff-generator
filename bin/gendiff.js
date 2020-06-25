#!/usr/bin/env node --experimental-json-modules
import commander from 'commander';

import generateDiff from '../src/index.js';
import packageJsonFile from '../package.json';

commander
  .version(packageJsonFile.version)
  .description(packageJsonFile.description)
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((firstFilePath, secondFilePath) => {
    console.log(generateDiff(firstFilePath, secondFilePath, commander.format));
  })
  .parse(process.argv);
