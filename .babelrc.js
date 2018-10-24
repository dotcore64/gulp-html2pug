const env = process.env.NODE_ENV || 'production';
const targets = env === 'test' ? { node: 'current' } : { node: '6' };
const plugins = env === 'test' ? ['istanbul'] : [];

module.exports = {
  presets: [['@babel/env', { targets }]],
  plugins,
}
