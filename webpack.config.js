const path = require("path");
var fs = require("fs");

const { NODE_ENV = "production" } = process.env;

var nodeModules = {};
fs.readdirSync("node_modules")
  .filter(function (x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  entry: "./src/index.js",
  mode: NODE_ENV,
  target: "node",
  watch: NODE_ENV === "development",
  externals: [nodeModules],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   use: {
      //     loader: "ts-loader",
      //     options: {
      //       // disable type checker
      //       // FASTER compilation times
      //       transpileOnly: true, // RECOMMEND TO TURN OFF WHEN TESTING FOR FASTER COMPILATIONS
      //     },
      //   },
      //   exclude: /node_modules/,
      // },
      {
        test: /\.m?js/,
        include: /@babylonjs/,
        resolve: {
          fullySpecified: false, // bjs doesn't provide an extension in the import statements
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve("src"),
    },
  },
};
