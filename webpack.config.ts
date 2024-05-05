import * as path from 'path'
import { Configuration } from 'webpack'

const config: Configuration = {
  mode: 'development',
  devtool: false,
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['.ts', '.js', '.mts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}

export default config
