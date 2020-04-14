const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin")
  .default;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = (env, argv) => {
  var config = {
    devtool: process.env.NODE_ENV === 'development' ?  "source-map" : "none",
    entry: {
      bundle: ["./src/main.js"],
      essential: ["./src/essential.js"],
      styles: ["./src/styles.js"],
      // styles: ["./src/main.js", "./src/scss/styles.scss"],
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "js/[name].[hash].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          exclude: /fonts/,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                name: "img/[name].[ext]",
                emitFile: true,
                bypassOnDebug: true, // webpack@1.x
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
          resolve: {
            extensions: [".js", ".jsx", ".json"],
          },
        },
        {
          test: /\.scss$/,
          use: [
              MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { sourceMap: true, importLoaders: 1 },
            },
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /(img|icons)/,
          include: /src\/fonts/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                emitFile: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CompressionPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "[id].css"
      }),
      //   new Dotenv(),
      new HtmlWebpackPlugin({
        title: "Hello! I am leo",
        filename: "index.html",
        template: "src/index.html",
        excludeChunks: ["styles", "essential"]
      }),

    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          fooStyles: {
            name: 'styles',
            test: (m, c, entry = 'styles') =>
              m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
            chunks: 'all',
            enforce: true,
          },
          barStyles: {
            name: 'essential',
            test: (m, c, entry = 'essential') =>
              m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
            chunks: 'all',
            enforce: true,
          },
        }
      }
  },
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
  };

  return config;
};
