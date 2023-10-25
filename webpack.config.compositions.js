// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");


const isProduction = true


const config = {
    entry: './src/compositions/index.ts',
    output: {
        publicPath: 'https://epart-components-dev.ifok.digital/compositions/',
        path: path.resolve(__dirname, 'storybook-static/components'),
        filename: 'index2.js',
    },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
        extensionAlias: {
          ".js": [".js", ".ts"],
          ".cjs": [".cjs", ".cts"],
          ".mjs": [".mjs", ".mts"]
         }
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true,
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              }
            }
        },
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
