const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: ['babel-polyfill', './src/index.js'],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  externals: [nodeExternals()],
};
