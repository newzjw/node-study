/*
 * @Author: your name
 * @Date: 2021-06-14 01:18:40
 * @LastEditTime: 2021-06-27 20:20:26
 * @LastEditors: Please set LastEditors
 * @Description: 不借助第三方库，搭建服务器
 * @FilePath: \node-study\11.node原生搭建服务器\server.js
 */

// 1.引入内部http模块
let http = require('http')

/*
备注：
  1.key=value&key=value.....的编码形式：urlencoded编码形式。
  2.请求地址里携带urlencoded编码形式的参数，叫做：查询字符串参数(query参数)。
* */
// 引入querystring模块，用于解析urlencoded编码形式
let qs = require('querystring')

// 2.创建服务对象
let server = http.createServer((request, response) => {
  /*
  * request:请求对象，里面包含着客户端给服务器的“东西”
  * response：响应对象，里面包含着服务器要返回给客户端的“东西”
  * */
  // 获取客户端携带过来的urlencoded编码形式的参数
  let params = request.url.split('?')[1]  // name=zhangsan&age=18
  let objParams = qs.parse(params)
  let {name, age} = objParams
  // 设置响应头
  response.setHeader('content-type','text/html;charset=utf-8')
  response.end(`你好${name},你的年龄是${age}`)

})

// 3.指定服务器运行的端口号（绑定端口监听）
server.listen(3000, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('服务器启动成功了')
  }
})
