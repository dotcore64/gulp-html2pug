module.exports = {
  reporter: 'spec',
  ui: 'bdd',
  require: ['env-test', '@babel/register', './test/setup'],
};
