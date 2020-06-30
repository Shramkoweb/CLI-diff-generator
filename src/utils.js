// utils
import path from 'path';
import fs from 'fs';
import { EXTENSION_MAPPING } from './constants';

export const getFixturePath = (fileName) => path.resolve('__tests__', '__fixtures__', fileName);

export const getFixtureContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8').trim();

export const getFileFormat = (fileExtension) => EXTENSION_MAPPING[fileExtension];
