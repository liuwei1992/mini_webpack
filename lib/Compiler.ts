import fs from 'fs'
import path from 'path'

import { SyncHook } from 'tapable'
import { toUnixPath } from './utils'
import * as parser from '@babel/parser'
import generator from '@babel/generator'
import traverse from '@babel/traverse'
import * as types from 'babel-types'

interface CompilerHook {
  [p: string]: SyncHook<any>
}
export class Compiler {
  hooks: CompilerHook | null = null
  context: string | null = null

  constructor(public options: any) {
    // /Users/XXXX/Desktop/myGit/mini_webpack
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
    let targetSourceCode = originalSourceCode
    for (let i = loaders.length - 1; i >= 0; i--) {
      targetSourceCode = require(loaders[i]).default(originalSourceCode)
    }

    // 获取模块 id （取相对路径）
    const moduleId =
      './' + path.posix.relative(toUnixPath(this.context!), modulePath)

    // 保存将来编译之后的产出
    const module: any = { id: moduleId, dependencies: [], name: moduleName }

    // import { isObject } from './util' ->'src/util'
    // 使用 ast 语法树按着自己的需要来处理，然后将结果返回
    let ast = parser.parse(targetSourceCode, { sourceType: 'module' }) //import require
    traverse(ast, {
      CallExpression: (NodePath) => {
        // const node = NodePath.node
        // console.log('node', node.callee)
      },
      ImportDeclaration: (NodePath) => {
        const node = NodePath.node

        const currentModuleName = node.source.value // ./util

        const dirName = path.posix.dirname(modulePath) // /Users/XXXX/Desktop/myGit/mini_webpack/src

        let depModulePath = path.posix.join(dirName, currentModuleName) // /Users/XXXX/Desktop/myGit/mini_webpack/src/util

        const extensions = this.options.resolve
          ? this.options.resolve.extensions
          : ['.js', '.json', '.jsx']

        depModulePath = addExtensions(depModulePath, extensions)

        const depModuleId =
          './' + path.posix.relative(toUnixPath(this.context!), depModulePath) // ./src/util

        node.source = types.stringLiteral(depModuleId) as any

        module.dependencies.push(depModulePath)
      }
    })

    // console.log('ast', ast)

    traverse(ast, {
      ImportDeclaration: (NodePath) => {
        const node = NodePath.node
        console.log('node.source.value', node.source.value)
      }
    })

    return module
  }
}

function addExtensions(modulePath: string, extensions: string[]) {
  // 如果用户自己加了
  if (path.extname(modulePath) === '.js') return modulePath

  for (let i = 0; i < extensions.length; i++) {
    if (fs.existsSync(modulePath + extensions[i]))
      return modulePath + extensions[i]
  }

  throw new Error(`${modulePath}对应模块不存在`)
}

function formatEntry(entry: any) {
  if (typeof entry === 'string') {
    return {
      main: entry
    }
  }
  return entry
}
