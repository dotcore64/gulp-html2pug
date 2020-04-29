module.exports = ({ env }) => env('test')
  ? { plugins: ['istanbul'] }
  : { plugins: ['@babel/proposal-throw-expressions'] };
