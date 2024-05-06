import { getOptions, interpolateName } from 'loader-utils'

function loader1(this: any, content: string) {
  const options = getOptions(this)
  // 生成打包后输出的文件名
  let filename = interpolateName(this, options.filename!, { content })

  // 将文件拷贝至指定目录
  this.emitFile(filename, content)

  // 返回一个 buffer 或者字符串直接给 compiler 使用
  return `module.exports=${JSON.stringify(filename)}`
}
// 二进制数据
loader1.raw = true

export default loader1
