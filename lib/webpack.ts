import { Compiler } from './Compiler'

export default function webpack(config: any) {
  // '--mode=development' ->{mode:development }
  const options = process.argv.slice(2).reduce((pre: any, current: string) => {
    const [key, value] = current.split('=')
    pre[key.substring(2)] = value
    return pre
  }, {})

  const finallyOptions = { ...config, ...options }
  const compiler = new Compiler(finallyOptions)

  finallyOptions.plugins.forEach((plugin: any) => plugin.apply(compiler))

  return compiler
}
