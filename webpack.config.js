const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
};
