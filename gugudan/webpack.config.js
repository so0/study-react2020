const path = require('path');
const webpack = require('webpack');

// npm run dev  or  npx webpack
module.exports = {
  mode: 'development',
  devtool: 'eval', // hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js']
  },
  entry: {
    app: './client' // 확장자 생략가능
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 5% in KR', 'last 2 chrome versions']
                }
              }
            ],
            '@babel/preset-react'
          ],
          plugins: []
        }
      }
    ]
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist')
  }
};
