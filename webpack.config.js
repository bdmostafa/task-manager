// Common js modular pattern
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            // Multiple scripts js file load
            test: /\.js$ /,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['@babel/preset-env']
            }
        }]
    },
    devServer: {
        publicPath: '/build/'
    },
    mode: 'development'
}