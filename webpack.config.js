const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

const env = process.env.NODE_ENV || 'development';

module.exports = {

  mode: env,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext]',
    /* clean: true */
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      minify: false
    }),
  ],

  module: {

    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          (env === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.pug$/,
        use:
          {
              loader: 'pug-loader',
              options: {
                pretty: true,
              },
          },
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },

  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              [
                "svgo",
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      }),
    ],
  },
}