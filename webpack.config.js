<<<<<<< HEAD
// Desc: webpack configuration file
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
=======
const path = require('path');
>>>>>>> 3fdbb77... both galleries work on live serverver again

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
<<<<<<< HEAD
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
=======
    }
};

module.exports = {
    entry: {
        firstBundle: './path/to/firstMainFile.js',
        secondBundle: './path/to/secondMainFile.js',
        // more entries as needed
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // other configurations...
>>>>>>> 3fdbb77... both galleries work on live serverver again
};
