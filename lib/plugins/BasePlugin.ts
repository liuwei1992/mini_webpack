import { Compiler } from '../Compiler'

export default abstract class BasePlugin {
  abstract apply(compiler: Compiler): void
}
