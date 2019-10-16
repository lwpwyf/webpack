'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },//输入目录
    output: {
        path: path.join(__dirname, 'dist'), //打包的路径
        // filename: 'bunldle.js'//打包的文件名
        filename: '[name]_[chunkhash:8].js'//打包的文件名
    },
    mode: 'production',//生产模式
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,      //实现css文件指纹的效果，去除了style-loader.因为有冲突         
                    'css-loader',
                    'less-loader',
                    {           //处理兼容性css问题。
                        loader: 'postcss-loader',
                        options: {
                            plugins: () =>[
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']//指定要兼容的浏览器的版本  版本使用指定的人数，兼容的
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',//css自动化转化方案  转成rem
                        options: {
                            remUnit: 75,         //转换单位。一个rem = 75像素
                            remPrecision: 8         //有效值保留小数点后8位 
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),      //指定htmlwebpackplugin插件所指定模板的位置，可以使用ejs的语法
            filename: 'index.html',                                //指定打包出来的文件名称
            chunks: ['index'],                                     //指定每次生成的html要使用的chunk
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),  
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/search.html'),      //指定htmlwebpackplugin插件所指定模板的位置，可以使用ejs的语法
            filename: 'search.html',                                //指定打包出来的文件名称
            chunks: ['search'],                                     //指定每次生成的html要使用的chunk
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}
