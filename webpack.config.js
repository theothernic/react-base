const path = require('path');


// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    return {
        mode: 'production',
        entry: path.resolve(__dirname, 'src/app.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'assets/js/bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass')
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images'
                    }
                },
                {
                    test: /\.(woff2?|ttf|otf|eot)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: true
            }),
            new HtmlWebpackPlugin({
                title: 'React Base App',
                template: path.resolve(__dirname, 'src', 'index.html')
            }),
            new MiniCssExtractPlugin({
                filename: 'assets/css/bundle.css'
            })
        ],
        resolve: {
            extensions: ['.js', '.jsx']
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true
        }
    };
};