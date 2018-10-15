const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './js/app.js'
    },
    output: {
        filename: '[name].min.js'
    },
    resolve: {
        modules: ["node_modules"],
        // directories where to look for modules
        extensions: [".js"]
    }
};