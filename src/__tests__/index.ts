import * as path from 'path';
import * as fs from 'mz/fs';
import * as del from 'del';

import { bump, getTag } from '../';

describe('getTag', () => {
  let env;
  beforeAll(() => {
    env = process.env;
  });

  beforeEach(() => {
    process.env = env;
  });

  it('can get a single tag', () => {
    process.env.GIT_TAG = '1.0.0';

    expect(getTag(['GIT_TAG'])).toEqual(process.env.GIT_TAG);
  });

  it('throws if env var is not defined', () => {
    expect(() => getTag([])).toThrow();
  });
});

describe('bump', () => {
  const options = {
    root: path.relative(process.cwd(), path.join(__dirname, '../__fixtures__')),
    outDir: 'output'
  };

  const outputFile = (name = 'package.json') => path.join(__dirname, `../__fixtures__/output/${name}`);

  const parse = (filePath, json = true) => {
    return fs.readFile(filePath, 'utf8')
      .then(contents => json ? JSON.parse(contents) : contents);
  };
  
  beforeEach(() => {
    process.env.TRAVIS_TAG = '1.0.1';
  });

  afterAll(async () => {
    await del(path.join(__dirname, '../__fixtures__/output'));
  });

  it('writes the output file', async () => {
    await bump(options);

    const exists = await fs.exists(outputFile());

    expect(exists).toBe(true);
  });

  it('updates the version', async () => {
    await bump(options);

    const { version } = await parse(outputFile());

    expect(version).toBe(process.env.TRAVIS_TAG);
  });

  it('keeps original indentation', async () => {
    await bump({
      ...options,
      file: 'package-4.json'
    });

    const contents = await parse(outputFile('package-4.json'), false);

    expect(contents.match(/\s{4}"/).length).toBeGreaterThan(0);
  });
});
