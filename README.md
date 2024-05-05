# mini_webpack

## webpack 打包 方式
1、通过命令行 webpack-cli
2、参看run.js 同过webpack().run() 打包


## node 项目 接入ts
1、ts-node tslib @types/node typescript
2、tsconfig中
```json
 "module": "CommonJS",
 "types": [
      "node"
 ],
```
3、命令行 "ts-node src/index.ts"

## 生成.d.ts 的配置
```json
{
  "compilerOptions":{
    "declaration": true,// 是否生成声明文件
    "declarationDir": "dist/type",// 声明文件打包的位置
  }
}
```

    // "start": "ts-node src/index.ts --mode=development --entry=src/index.js"

