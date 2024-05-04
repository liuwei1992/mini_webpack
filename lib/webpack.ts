import { Compiler } from './Compiler'

export default function webpack(config: any) {
  const compiler = new Compiler()
  return compiler
}
