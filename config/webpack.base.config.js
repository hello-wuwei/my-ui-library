const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  devtool: 'cheap-module-eval-source-map',  // 打包后打印对应源码文件
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      "@": path.resolve(__dirname, "../src/")
    }
  },
  module: {
    rules: [
      /* **babel-loader：**使用Babel和webpack来转译JavaScript文件。
        **@babel/preset-react：**转译react的JSX
        **@babel/preset-env：**转译ES2015+的语法
        **@babel/core：**babel的核心模块
      */
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'font/'
          }
        }
      },
      {
        test: /\.(jpg|png|gif)$/,   // 遇到以jpg,png,gif为后缀的文件，使用url-loader进行预处理
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',   // 输出的文件名为 原来的文件名.后缀
            outputPath: 'images/',  // 输出到dist目录下的路径
            limit: 8192,  // 如果这个图片文件大于8192b，即8kb，那我url-loader就不用，转而去使用file-loader，把图片正常打包成一个单独的图片文件到设置的目录下，若是小于了8kb，那好，我就将图片打包成base64的图片格式插入到bundle.js文件中，这样做的好处是，减少了http请求，但是如果文件过大，js文件也会过大，得不偿失
          }
        }
      },
      {
        test: /\.md$/,
        use: "raw-loader"
      }
    ]
  }
}