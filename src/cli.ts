#!/usr/bin/env node
import * as yargs from 'yargs';

import { bump } from './';

const args = yargs
  .option('file', 'The file to use to edit (*must* be JSON)')  
  .option('root', 'The directory to use as the root')
  .option('outDir', 'The directory in which to write the package.json')
  .option('envVars', 'An array of variables in which to check for a version/tag')
  .argv;

bump(args)
  .then(({ output, version }) => {
    console.log(`Wrote ${output} with version ${version}`);
    process.exit(0);
  })
  .catch(err => {
    console.warn(err);
    process.exit(1);
  });
