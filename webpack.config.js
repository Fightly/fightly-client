var webpack = require('webpack');
var path = require('path');
var srcPath = path.join(__dirname, 'lib');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

var libraryName = 'fightly';
var plugins = [];
var outputFile;

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
}
else {
    outputFile = libraryName + '.js';
}

module.exports = {
    entry: srcPath + '/fightly.js',
    devtool: 'source-map',
    output: {
        path: './',
        filename: outputFile,
        library: libraryName,
        // libraryTarget: 'var',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
        ]
    },
    plugins: plugins,
    debug: (env === 'build'),
};
