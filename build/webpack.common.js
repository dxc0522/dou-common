const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');
const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { entryList } = require('./config');
const packageJSON = require('../package.json');

const resolve = (dir) => {
    return path.join(__dirname, dir)
}
const NODE_ENV = process.env.NODE_ENV

console.log('entryList', entryList)
const webpackConfig = {
    mode: 'production',
    entry: {
        'css/base': '@/css/base.css',
    },
    output: {
        path: path.resolve(process.cwd(), './dist'),
        chunkFilename: '[id].js',
        libraryExport: 'default',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.scss', '.js', '.json'],
        alias: {
            "~": resolve("../"),
            "@": resolve("../src"),
        },
    },
    performance: {
        hints: false
    },
    stats: 'none',
    optimization: {
        mergeDuplicateChunks: true,
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // 与 webpackOptions.output 中的选项相似
            // 所有的选项都是可选的
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.BannerPlugin({
            banner: `[file]\nNPM：${packageJSON.name}\n作者：${packageJSON.author}\n版本号：${packageJSON.version}\n时间：${new Date()}`
        }),
        new ProgressBarPlugin({
            format:
                chalk.green.bold(`${packageJSON.name} V${packageJSON.version} 构建中 `) +
                '[:bar] ' +
                chalk.green.bold(':percent') +
                ' (:elapsed seconds)',
            clear: false
        }),
    ],
};

module.exports = webpackConfig;