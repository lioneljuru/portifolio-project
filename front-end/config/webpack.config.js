const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // Entry point for the application
    entry: './src/index.js',

    // Output configuration
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },

    // Mode configuration: `development` `production`
    mode: 'development',

    performance: {
        maxAssetSize: 1000000,
    },

    // Source maps configuration for debugging
    devtool: 'inline-source-map',

    // Module rules to handle different types of files
    module: {
        rules: [
            {
                // Rules to transpile js & jsx files
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
            },

            {
                // Rule to handle CSS files
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            {
                // Rule to handle image files
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ],
    },

    // Development server configuration
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        hot: true,
        open: true,
        compress: true,
    },

    // Optimization configuration for code splitting
    /*
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
    },*/

    // Plugins configuration
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'), // Template for the generated HTML file
            filename: 'index.html',       // Name of the generated HTML file
        }),
        new CleanWebpackPlugin(), // Plugin to clean the output directory before each build
    ],
};