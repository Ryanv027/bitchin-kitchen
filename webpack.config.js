var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/index.js",
    output: {
        path: __dirname + "/public",
        filename: "script/index.min.js"
    },
    plugins: debug ? [
        new webpack.ProvidePlugin({
                    '$': "jquery",
                    'jQuery': "jquery",
                    'Popper': 'popper.js'
        }),
    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    module: {
        rules:[
            {
                test:/\.(s*)css$/,
                use: ExtractTextPlugin.extract({ 
                    fallback:'style-loader',
                    use:['css-loader','sass-loader'],
                })
             },
             {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: "fonts/[name].[ext]",
                  },
                },
              },
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: 'style/main.css'}),
    ]
};