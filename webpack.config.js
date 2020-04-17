const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

module.exports = (env, argv) => {
    function isDevelopment() {
        return argv.mode === "development";
    }

    var config = {
        entry: {
            editor: "./src/editor.js",
            script: "./src/script.js"
        },
        output: {
            filename: "[name].js"
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: true
                        }
                    }
                })
            ]
        },
        plugins: [
            new CleanPlugin(),
            new MiniCSSExtractPlugin({
                moduleFilename: ({ name }) => `${name.replace("script", "style")}.css`
            })
        ],
        devtool: isDevelopment() ? "cheap-module-source-map" : "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    "@babel/preset-env",
                                    [
                                        "@babel/preset-react",
                                        {
                                            pragma: "wp.element.createElement",
                                            pragmaFrag: "wp.element.Fragment",
                                            development: isDevelopment()
                                        }
                                    ]
                                ]
                            }
                        },
                        "eslint-loader"
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [autoprefixer()]
                            }
                        },
                        "sass-loader"
                    ]
                }
            ]
        },
        externals: {
            jquery: "jQuery",
            react: ["wp", "element"],
            "@wordpress/blocks": ["wp", "blocks"],
            "@wordpress/block-editor": ["wp", "blockEditor"],
            "@wordpress/components": ["wp", "components"],
            "@wordpress/editor": ["wp", "editor"]
        }
    };
    return config;
};
