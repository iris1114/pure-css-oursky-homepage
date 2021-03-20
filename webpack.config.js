
const TerserPlugin = require('terser-webpack-plugin')

module.exports= {
    mode:'production',
    entry: "./src/js/main.js",
    output: {
        filename: "[name].min.js"
    },
    module: {
        rules: [
            {   test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                    presets: [
                        ['@babel/preset-env']
                    ]
                    }
                }]
            },

        ]
    },
    plugins: [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
              ecma: 6,
            },
        }),
    ]
};

