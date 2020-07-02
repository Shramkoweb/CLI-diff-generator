import path, { dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import { EXTENSION_MAPPING } from './constants.js';

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

export const getFixturePath = (fileName) => path.resolve(dir, '../', '__tests__', '__fixtures__', fileName);

export const getFixtureContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8').trim();

export const getFileFormat = (fileExtension) => EXTENSION_MAPPING[fileExtension];
