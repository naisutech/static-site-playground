/**
 * ENV
 */
require('dotenv').config()
const env = Object.assign({}, process.env)
const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * NODE LIBS
 */
const path = require('path')

/**
 * PLUGINS
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/**
 * LOADERS
 */

/**
 * CORE CONFIG
 */
module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(process.cwd(), './dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: '!!handlebars-loader!./static/index.hbs',
      title: env.APP_NAME ? env.APP_NAME : 'Naisu Playground',
      description: env.APP_DESCRIPTION,
      author: env.APP_AUTHOR,
      keywords: env.APP_KEYWORDS,
      url: env.APP_URL
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      { test: /\.hbs$/, use: ['handlebars-loader'] }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.hbs']
  },
  node: {
    fs: 'empty' // https://github.com/webpack-contrib/css-loader/issues/447
  },
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    port: 4000,
    contentBase: './dist',
    hot: true
  }
}
