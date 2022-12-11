// const path = require('path');
import path from 'path'
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const chalk = require('chalk');
// const packageJSON = require('../package.json');
const webpackConfig = {
    mode: 'production',
    entry: {
        'index.scss': `~/src/css/index.scss`,
        "index.common": "~/src/index.js",
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        chunkFilename: '[id].js',
        libraryExport: 'default',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            "~": resolve("../"),
        },
        modules: ['node_modules']
    },
    performance: {
        hints: false
    },
    stats: 'none',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                loaders: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },
    plugins: [
        // new webpack.BannerPlugin({
        //     banner: `[file]\nNPM：${packageJSON.name}\n作者：${packageJSON.author}\n版本号：${packageJSON.version}\n时间：${new Date()}`
        // }),
        // new ProgressBarPlugin({
        //     format:
        //         chalk.green.bold(`${packageJSON.name} V${packageJSON.version} 构建中 `) +
        //         '[:bar] ' +
        //         chalk.green.bold(':percent') +
        //         ' (:elapsed seconds)',
        //     clear: false
        // }),
        // new CleanWebpackPlugin(),
    ]
};

module.exports = webpackConfig;