var path = require('path');

module.exports = {
    entry: './src/main/js/homepage.jsx',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    plugins: ['transform-object-rest-spread'],
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};