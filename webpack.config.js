module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    // What file extensions will webpack look
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    loaders: [
      {
        // Use babel for files that end in js or jsx.
        test: /jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
};
