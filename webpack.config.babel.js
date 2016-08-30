import webpack from 'webpack'
import path from 'path'

export default {
  entry: {
    main: './index.js',
  },

  devtool: '#cheap-module-inline-source-map',

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
}
