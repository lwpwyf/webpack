'use strict';

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },//输入目录
    output: {
        path: path.join(__dirname, 'dist'), //打包的路径
        // filename: 'bunldle.js'//打包的文件名
        filename: '[name].js'//打包的文件名
    },
    mode: 'development',//生产模式
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()        
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}