const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/bootstrap.ts',
  devtool: 'source-map',
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
    filename: 'app.js',
    library: 'unknown',
    path: path.resolve(__dirname, 'dist')
  }
};