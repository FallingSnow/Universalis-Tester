const path = require('path');
const nodeExternals = require('webpack-node-externals');
const fs = require('fs-extra');
const os = require('os');
const packageJson = require('./package.json');
const webpack = require('webpack');

const tempDir = path.join(os.tmpdir(), packageJson.name);
fs.ensureDirSync(tempDir);
const symLinkNodeModules = path.join(tempDir, 'node_modules');


module.exports = function(env, options) {
    env = env ? env : options.mode ? options.mode : 'development';

    if (env === 'development') {
        if (!fs.existsSync(symLinkNodeModules)) {
            fs.symlinkSync(path.resolve(__dirname, 'node_modules'), symLinkNodeModules, 'dir');
        }
    }

    return {
        target: 'async-node',
        context: path.resolve(__dirname),
        entry: {
            [packageJson.name]: './index.js',
            [packageJson.name + '-cli']: './lib/cli.js'
        },

        output: {
            path: env === 'production' ? path.resolve(__dirname, 'dist') : path.join(tempDir),
            publicPath: '',
            libraryTarget: 'umd',
            filename: '[name].js',
        },

        externals: [nodeExternals()],

        resolve: {
            extensions: ['.js', '.json']
        },

        plugins: [
            new webpack.BannerPlugin({
                banner: 'require("source-map-support").install();\n',
                raw: true
            }),
            new webpack.BannerPlugin({
                banner: '#!/bin/env node\n',
                raw: true,
                include: /cli/
            }),
        ],


        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        },

        stats: {
            colors: true
        },

        // devtool: env === 'production' ? 'source-map' : 'cheap-module-source-map',
        devtool: 'source-map'
    };
};
