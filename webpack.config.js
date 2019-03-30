const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
    library: 'function-to-worker',
    libraryTarget:'umd'
  },
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: [/node_modules/, /build/]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".json"]
  }
};
