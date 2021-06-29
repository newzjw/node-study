/*
 * @Author: your name
 * @Date: 2021-06-22 20:18:41
 * @LastEditTime: 2021-06-30 03:59:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-study\login&register-demo\server.js
 */
const express = require('express')

const app = express()
//禁止服务器返回X-Powered-By,为了安全
app.disable('x-powered-by')
//使用内置中间件暴露静态资源，不访问路由直接写文件名+后缀也能看页面
app.use(express.static(__dirname + '/public'))
//配置模板引擎
app.set('view engine','ejs')
app.set('views','./views')
//引入模型对象，进行CRUD
const usersModel = require('./model/usersModel')
//引入db模块，用于连接数据库
const db = require('./db/db')
//使用内置中间件用于解析post请求的urlencoded参数
app.use(express.urlencoded({ extended: true }))

//引入UI路由器
const UIRouter = require('./router/UIRouter')
//引入登录注册路由器
const loginRegisterRouter = require('./router/loginRegisterRouter')

//如下代码是配置express中操作session
//引入express-session，用于在express中简化操作session
const session = require('express-session');
//引入connect-mongo，用于做session持久化
const MongoStore = require('connect-mongo')(session);


app.use(session({
  name: 'peiqi',   // 返回给客户端cookie的key。
  secret: 'atguigu', // 参与加密的字符串（又称签名）
  saveUninitialized: false, //是否在存储内容之前创建session会话，如果是true，给了页面没点登陆就创建了session
  resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化（比较保险）
  // 数据库持久化，往sessions_container里存session信息
  store: new MongoStore({
    url: 'mongodb://localhost:27017/sessions_container',
    touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作cookie
    maxAge: 1000*30 // cookie的key，cookie的value，均不在此处配置。这里设置cookie的过期时间,
  },
}));

db(() => {
  //使用UIRouter
  app.use(UIRouter())
  //使用loginRegisterRouter
  app.use(loginRegisterRouter())
  app.listen(3000, err => {
    if (!err) console.log('服务器启动成功！')
    else console.log(err)
  })
}, err => {
  console.log('数据库连接失败', err)
})

