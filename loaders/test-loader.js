// 给 webpack 打包用的
const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const schemaTestLoader = require('../lib/schema/test-loader-schema.json')

function loader(content) {
  // 异步
  const callback = this.async()

  // 参数
  const options = getOptions(this) || {}

  validate(schemaTestLoader, options)

  setTimeout(() => {
    callback(null, content)
  }, 3000)
  // return content + '//appendContent'
}

loader.pitch = () => {
  console.log('loader.pitch')
}

module.exports = loader
