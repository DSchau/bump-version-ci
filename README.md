# bump-version-ci

A simple utility to bump the version field in package.json. Typically used in CI/automated environments that perform releases. It does this by checking common CI environment variables e.g. `TRAVIS_TAG`, `CIRCLE_TAG`, etc. and using this version as the package.json version field.

## Install

```
yarn add @dschau/bump-version-ci
```

OR

```
yarn global add @dschau/bump-version-ci
```

for CLI usage.

## Usage

### Programmatic

```javascript
const { bump } = require('@dschau/bump-version-ci');

bump({
  envVars: [],
  file: 'package.json',
  root: '.',
  outDir: 'dist'
})
  .then(({ output, version }) => {
    console.log(`Wrote at ${output} with version ${version}`);
  });
```

### CLI

```
bump-version --root . --out-dir dist --env-vars DRONE_TAG
```
