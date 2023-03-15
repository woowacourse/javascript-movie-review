module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-console': ['error'],
  },
};
