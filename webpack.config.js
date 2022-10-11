const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    devtool: slsw.lib.webpack.isLocal ? 'source-map' : 'cheap-source-map',
    entry: slsw.lib.entries,
    target: 'node',
    resolve: {
        extensions: ['.cjs', '.mjs', '.js', '.ts'],
    },
    externals: ['aws-sdk', nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                exclude: [
                    [
                        path.resolve(__dirname, '.webpack'),
                        path.resolve(__dirname, '.serverless'),
                        path.resolve(__dirname, 'swagger'),
                    ],
                ],
                options: {
                    experimentalFileCaching: true,
                },
            },
        ],
    },
};
