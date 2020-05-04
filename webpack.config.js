var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
                loader: "file-loader?name=/public/icons/[name].[ext]"

            },
            {   test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
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
        }),
        new CopyPlugin([
          { from: 'assets', to: 'assets' }
        ]),
    ],
    stats:{
        children:false
    },
    devServer: {
        port:8080,
        inline:true
    }
};