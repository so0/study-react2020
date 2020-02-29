const path = require('path');
module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실 서비스 : production
  devtool: 'eval', // 빠르게 하겠다?..
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: ['./client']
  }, // 입력
  module: {
    rules: [
      {
        test: /\.jsx?/, // js, jsx
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 1% in KR'] // browserlist
                },
                debug: true
              }
            ],
            '@babel/preset-react'
          ],
          plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel']
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  } // 출력
};
