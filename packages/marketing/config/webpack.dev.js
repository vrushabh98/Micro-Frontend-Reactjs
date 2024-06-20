const { merge } = require("webpack-merge");
// "merge" is a function that we can use to merge two different webpack config objects.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap.js",
      },
      // shared: ["react", "react-dom"],
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);

/*
   shared: ['react', 'react-dom'] => In this case whenever you install any package in container as well as in marketing app (remote application) then you have to mention that package name in shared array of both container and marketing webpack. That's we can call one drawback. However we can overcome from this by using little shortcut.

   ** Shortcut to for shared module => Rather than adding package name in the shared array we can simply give them all the dependencies of package.json, so whenever you install new package that will automatically added to the shared module, but if you want to specific in the shared module then you should use shared: ['react', 'react-dom'] this kind of approach adding manually package name in shared module array.

*/
