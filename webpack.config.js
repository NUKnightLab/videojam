const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || '8080';

module.exports = {
  context: __dirname,
  entry: [
    './renderer.js',
    'babel-polyfill',
    path.resolve(__dirname, './renderer.js'),
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`
  ],
  target: 'electron-renderer',
  output: {
    filename: 'renderer.bundle.js',
    path: __dirname + '/bundle',
    publicPath: `http://localhost:${port}/bundle/`,
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, './renderer.js')
        ],
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'react-hmre']
        }
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.png/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 12000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin()
  ]
};
