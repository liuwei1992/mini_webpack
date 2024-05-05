import { Compiler } from '../Compiler'
import BasePlugin from './BasePlugin'

export default class DonePlugin extends BasePlugin {
  apply(compiler: Compiler) {
    compiler.hooks?.done.tap('DonePlugin', () => {
      console.log('compiler.hooks?.sync.tap.DonePlugin')
    })
  }
}
