// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");


const isProduction = true


const config = {
    entry: './src/compositions/index.ts',
    output: {
        publicPath: 'auto',
        path: path.resolve(__dirname, 'storybook-static/compositions'),
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
        
        runtimeChunk: false,
        splitChunks: false,
        
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
