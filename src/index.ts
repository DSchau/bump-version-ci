import * as fs from 'mz/fs';
import * as mkdir from 'mz-modules/mkdirp';
import * as path from 'path';
import * as detectIndent from 'detect-indent';

import { defaults as defaultsFn } from './defaults';

export const getTag = envVars => {
  const tag = envVars
    .reduce((envVar, tag) => {
      if (!envVar && process.env[tag]) {
        envVar = process.env[tag];
      }
      return envVar;
    }, '');

  if (!tag) {
    throw new Error('Requires a environment variable to get git tag');
  }

  return tag;
};

export async function bump(options = {}) {
  const defaults = defaultsFn(options);
  const root = path.join(process.cwd(), defaults.root);

  const [indent, pkg] = await fs.readFile(path.join(root, defaults.file), 'utf8')
    .then(contents => {
      return [
        detectIndent(contents).indent || defaults.indent,
        JSON.parse(contents)
      ];
    })
    .catch(err => {
      throw new Error(err);
    });

  const tag = getTag([].concat(defaults.envVars));
  const replaced = JSON.stringify(Object.assign(pkg, {
    version: tag
  }), null, indent);
  const outputFolder = path.join(root, defaults.outDir);
  await mkdir(outputFolder);

  const outputPackagePath = path.join(root, defaults.outDir, defaults.file);

  return await fs.writeFile(outputPackagePath, replaced, 'utf8')
    .then(() => ({
      output: outputPackagePath,
      version: tag
    }))
    .catch(err => {
      throw new Error(err);
    });
}
