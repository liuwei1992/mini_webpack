import * as path from 'path'
import DonePlugin from './lib/plugins/DonePlugin'
import EntryPlugin from './lib/plugins/EntryPlugin'

const config = {
  mode: 'development',
  devtool: false,
  entry: './src/entry.ts',
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
        use: [path.resolve(__dirname, 'lib/loaders', 'loader1.ts')],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new DonePlugin(), new EntryPlugin()]
}

export default config
