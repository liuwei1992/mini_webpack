// 给自己写的打包器用的
// export default function loader1(source: string) {
//   return source + '//appendContent'
// }

// 给 webpack 打包用的
import { getOptions } from 'loader-utils'
import { validate } from 'schema-utils'
// import schemaTestLoader from '../schema/test-loader-schema.json'
const schemaTestLoader = require('../schema/test-loader-schema.json')

function loader1(this: any, content: string) {
  // 异步
  // const callback = this.async()

  // 参数
  // const options = getOptions(this) || {}

  // validate(schemaTestLoader, options)

  // setTimeout(() => {
  //   callback(null, content)
  // }, 3000)
  return content + '//appendContent'
}

loader1.pitch = () => {
  console.log('loader.pitch')
}

export default loader1
