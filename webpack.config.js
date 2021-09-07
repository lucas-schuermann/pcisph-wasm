const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = (_, argv) => {
    console.log('Building in %s mode', argv.mode);
    config = {
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new WasmPackPlugin({
                extraArgs: "--target web -- -Z build-std=panic_abort,std",
                crateDirectory: path.resolve(__dirname, ".")
            }),
            // Have this example work in Edge which doesn't ship `TextEncoder` or
            // `TextDecoder` at this time.
            new webpack.ProvidePlugin({
                TextDecoder: ['text-encoding', 'TextDecoder'],
                TextEncoder: ['text-encoding', 'TextEncoder']
            })
        ],
        experiments: {
            asyncWebAssembly: true
        },
        devServer: {
            headers: {
                'Cross-Origin-Embedder-Policy': 'require-corp',
                'Cross-Origin-Opener-Policy': 'same-origin',
            }
        }
    };
    return config;
}