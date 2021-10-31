module.exports = ({ env }) => ({
  plugins: env('test')
    ? ['istanbul']
    : ['@babel/proposal-throw-expressions', '@babel/proposal-partial-application'],
});
