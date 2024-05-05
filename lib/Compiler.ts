import fs from 'fs'
import path from 'path'

import { SyncHook } from 'tapable'
import { toUnixPath } from './utils'
import webpackConfig from '../webpack.config.my'

interface CompilerHook {
  [p: string]: SyncHook<any>
}
export class Compiler {
  hooks: CompilerHook | null = null
  context: string | null = null

  constructor(public options: any) {
    this.context = options.context ? options.context : process.cwd()
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook(),
      emit: new SyncHook()
    }
  }
  run() {
    // this.hooks!.run.call()
    // this.hooks!.emit.call()
    // this.hooks!.emit.call()
    console.log('执行 run')
    const entry = formatEntry(this.options.entry)

    for (let entryName in entry) {
      this.buildModule(
        entryName,
        toUnixPath(path.join(this.context!, entry[entryName]))
      )
    }
  }

  buildModule(moduleName: string, modulePath: string) {
    const rules = this.options.module.rules
    let loaders: any = []
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].test.test(modulePath)) {
        loaders = [...loaders, ...rules[i].use]
      }
    }

    const originalSourceCode = fs.readFileSync(modulePath, 'utf-8')

    for (let i = loaders.length - 1; i >= 0; i--) {
      const loader = require(loaders[i]).default
      const targetSourceCode = loader(originalSourceCode)

      console.log('targetSourceCode', targetSourceCode)
    }
  }
}

function formatEntry(entry: any) {
  if (typeof entry === 'string') {
    return {
      main: entry
    }
  }
  return entry
}
