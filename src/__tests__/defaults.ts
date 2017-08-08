import { defaults } from '../defaults';

test('it establishes defaults', () => {
  expect(Object.keys(defaults()).length).toBeGreaterThan(0);
});

test('it can override defaults', () => {
  const opts = defaults({ root: 'new-root' });

  expect(opts.root).toBe('new-root');
});

test('it can override defaults to N levels', () => {
  const opts = defaults({ root: 'new-root' }, { root: 'new-new-root'}, { root: 'new-new-new-root' });

  expect(opts.root).toBe('new-new-new-root');
});

test('it does not throw on falsy arguments', () => {
  expect(() => defaults(null, false, '', undefined)).not.toThrow();
});
