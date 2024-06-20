const path = require('path');

module.exports = {
  entry: './src/index.js', // This specifies the entry points of the application. Webpack starts building the dependency graph from this file.
  module: {
    rules: [ // Rules an array to handle different types of modules.
      {
        // Here we are going to define the loader.
        // The goal of a loader is to tell webpack to process some different file as we start to import them into our project.
        test: /\.m?js$/,  // It says that whenever we import in a file that ends with an extension of either mjs or just js we want to be processed by bable that's all test does.
        exclude: /node_modules/, // It means that do not try to run this babel thing on any file out of our node module directory.
        use: { 
          // "use" specifies the load to use for these files, in this case babel-loader.
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'] 
          }
        }
      },
      {
        test: /\.css$/i, // Regular expression that match .css file
        use: ['style-loader', 'css-loader'], // array of loader to handle CSS files.
        // "style-loader" => Injects CSS into the DOM.
        // "css-loader" => Interprets @import and url() like import or require and resolve them
      }
    ]
  },
  resolve: {
    // It specifies the file extensions Webpack will resolve. This allows you to import files without specifying their extension.
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

/*
    "@babel/preset-react" => Transform JSX into javascript.
    "@babel/preset-env" => Transform ES6+ code into ES5 for compatibility with older browser.
    "@babel/plugin-transform-runtime" => Optimizes the output by preventing duplication of helper function.

*/
