const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./index.ts",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: {
      name: "MyRichTextEditor",
      type: "umd",
    },
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: [nodeExternals()],
};
