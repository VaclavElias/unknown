const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'unknown.js',
    path: path.resolve(__dirname, 'dist')
  }
};