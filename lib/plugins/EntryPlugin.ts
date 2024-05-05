import { Compiler } from '../Compiler'
import BasePlugin from './BasePlugin'

export default class EntryPlugin extends BasePlugin {
  apply(compiler: Compiler) {
    compiler.hooks?.emit.tap('EntryPlugin', () => {
      console.log('compiler.hooks?.sync.tap.EntryPlugin')
    })
  }
}
