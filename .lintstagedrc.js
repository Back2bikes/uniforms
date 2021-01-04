module.exports = {
  '**/*.css': ['stylelint'],
  '**/*.{js,ts,tsx}': ['eslint'],
  '**/*.{ts,tsx}': () => 'npm run lint:types',
};
