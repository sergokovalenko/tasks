const path = require('path'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, 'src'),
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, 'dist/assets/media'),
    open: false,
    port: 3000,
    stats: 'normal',
  },
  devtool: 'inline-source-map',
  entry: {
    app: './app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // to let the loader know which file format it’s going to work on
        include: /src/, // to let the loader know which directory it should work into
        exclude: /node_modules/, // to let the loader know which directory should it avoid while parsing
        use: { //  to let the loader know which specific loader it’s using with use.loader and what’s it’s configuration options with use.options
          loader: "eslint-loader",
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/media/',
              publicPath: './assets/media/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  output: {
    filename: './assets/js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
};

module.exports = config;
