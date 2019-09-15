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
 * LIBS
 */
const autoprefixer = require('autoprefixer')

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
      filename: 'app.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      { test: /\.hbs$/, use: ['handlebars-loader'] },
      // https://iamakulov.com/notes/optimize-images-webpack/
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Images larger than 500 KB won’t be inlined
          limit: 500 * 1024,
          noquotes: true
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024
        }
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        enforce: 'pre'
      }
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
    host: '0.0.0.0',
    port: 4000,
    contentBase: './dist',
    watchContentBase: true,
    // hot: true,
    inline: true
  }
}
