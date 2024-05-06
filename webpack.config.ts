import * as path from 'path'
import { Configuration } from 'webpack'

const config: Configuration = {
  mode: 'development',
  devtool: false,
  entry: './src/entry.ts',
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['.ts', '.js', '.mts', '.json']
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'test-loader',
            options: {
              name: 'lw',
              age: '12'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}

export default config
