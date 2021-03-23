const path = require('path');

const dependencies = {
    entry: './src/index.jsx',
    mode: 'development',
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-env"],
                        plugins: ["babel-plugin-styled-components"]
                    }
                }
            },
        ]
    },

    devServer: {
        port: 1212,
        contentBase: path.resolve(__dirname, './public'),
        hot: true
    }
};

module.exports = dependencies;