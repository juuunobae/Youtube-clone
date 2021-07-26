const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/client/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assetes", "js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
