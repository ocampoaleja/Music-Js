var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry:'./index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            hmr: process.env.NODE_ENV === 'development'
                        },
                    },
                    {
                        loader:'css-loader?url=false',
                    },
                ],
                exclude:/node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use:[
                    'file-loader',
                    'img-loader',
                    {
                        loader: 'image-webpack-loader',
                        options:{ 
                            bypassOnDebug: true,
                            disable:true,
                        }
                    },
                ]
            }
        ]
    },
    devtool:'source-map',
    plugins:[ 
        new HtmlWebpackPlugin({
            filename:'./index.html',
            template:'./index.html'
        }),
        new MiniCssExtractPlugin({
            filename:devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        })
    ],
    stats:{
        children:false
    },
    devServer: {
        port:8080,
        inline:true
    }
};