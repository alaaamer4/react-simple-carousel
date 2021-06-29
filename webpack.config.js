const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: "/.css/",
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /.js/,
        exclude: "/node_modules/",
        use: "babel-loader",
      },
    ],
  },
};
