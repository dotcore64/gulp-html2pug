module.exports = ({ env }) => ({
  presets: [['@babel/env', { targets: { node: env('test') ? 'current' : '10' } }]],
  plugins: env('test') ? ['istanbul'] : [],
})
