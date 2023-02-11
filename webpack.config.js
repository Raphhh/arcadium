const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/ts/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        //clean: true,
        libraryTarget: 'umd',
        filename: 'dev.mjs'
    },
};