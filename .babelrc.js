module.exports = ({ env }) => ({
  presets: [['@babel/env', { targets: { node: env('test') ? 'current' : '10' } }]],
  plugins: [
    '@babel/proposal-throw-expressions',
    env('test') && 'istanbul',
  ].filter(Boolean),
})
