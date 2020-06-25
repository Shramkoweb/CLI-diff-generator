export const fileFormats = {
  INI: 'INI',
  JSON: 'JSON',
  YAML: 'YAML',
};

export const EXTENSION_MAPPING = {
  '.json': fileFormats.JSON,
  '.yaml': fileFormats.YAML,
  '.yml': fileFormats.YAML,
  '.ini': fileFormats.INI,
};

export const nodeStates = {
  ADDED: 'added',
  DELETED: 'deleted',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
  CHANGED: 'changed',
};
