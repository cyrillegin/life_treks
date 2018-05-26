const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: './src/client/index.js',
        vendor: [
            'angular',
            'angular-route',
            'jquery',
            'bootstrap',
            'three',
            'd3',
            'autotrack',
            './node_modules/font-awesome/css/font-awesome.min.css',
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/spin/spin.js',
            './node_modules/three/examples/js/loaders/OBJLoader.js',
            './node_modules/three/examples/js/loaders/MTLLoader.js',
            './node_modules/three/examples/js/exporters/OBJExporter.js',
            './node_modules/three/examples/js/exporters/STLExporter.js',
            './node_modules/three/examples/js/controls/OrbitControls.js',
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/server/public'),
        publicPath: '/',
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['babel-preset-env'],
                plugins: ['angularjs-annotate'],
            },
        }, {
            test: /\.html$/,
            loader: 'html-loader',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }, {
                loader: 'postcss-loader', // Run post css actions
                options: {
                    plugins() { // post css plugins, can be exported to postcss.config.js
                        return [
                            require('precss'),
                            require('autoprefixer'),
                        ];
                    },
                },
            }, {
                loader: 'sass-loader',
            }],
        }, {
            test: /\.png$|\?|\.gif($|\?)/,
            loader: 'url-loader?publicPath=/static/dist/&limit=100000',
        }, {
            test: /\.jpg$/,
            loader: 'file-loader',
        }, {
            test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            loader: 'url-loader',
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery', // eslint-disable-line
            jquery: 'jquery',
            THREE: 'three',
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NamedModulesPlugin(),
        new UglifyJSPlugin({
            uglifyOptions: {
                topLevel: true,
                keep_classnames: false, // eslint-disable-line
                compress: {
                    keep_fargs: false, // eslint-disable-line
                    keep_fnames: false, // eslint-disable-line
                    toplevel: true,
                    unsafe: true,
                    unsafe_arrows: true, // eslint-disable-line
                    unsafe_methods: true, // eslint-disable-line
                    unsafe_Function: true, // eslint-disable-line
                    unsafe_math: true, // eslint-disable-line
                    unsafe_proto: true, // eslint-disable-line
                    unsafe_regexp: true, // eslint-disable-line
                    unsafe_undefined: true, // eslint-disable-line
                    drop_console: true, // eslint-disable-line
                    passes: 2,
                },
                mangle: {
                    eval: true,
                    toplevel: true,
                },
            },
            exclude: /\/server/,

            // mangle: false,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            // In case you imported plugins individually, you must also require them here:
            'Util': 'exports-loader?Util!bootstrap/js/dist/util',
            'Dropdown': 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        }),
    ],
};
