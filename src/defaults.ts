let base = {
  envVars: ['TRAVIS_TAG', 'CIRCLE_TAG', 'DRONE_TAG'],
  file: 'package.json',
  indent: `  `,
  root: '.',
  outDir: 'dist'
};

export const defaults = (...opts) => {
  return opts
    .reduce((mergedDefaults, opt) => {
      return {
        ...mergedDefaults,
        ...(opt || {})
      };
    }, base);
}
