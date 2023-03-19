import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import DotEnv from "dotenv-webpack";

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    static: "./dist",
    open: true,
    historyApiFallback: true,
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new DotEnv(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs|ts)$/i,
        exclude: /node_modules/,
        use: { loader: "ts-loader" },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
