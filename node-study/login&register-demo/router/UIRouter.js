/*
 * @Author: your name
 * @Date: 2021-06-23 13:25:38
 * @LastEditTime: 2021-06-23 15:36:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-study\login&register-demo\router\UIRouter.js
 */
/*
* 专门用于管理展示界面的UI路由
* */
// 引入router构造函数
const {Router} = require('express')
// 创建一个路由实例，路由器就是一个小型的app
const router = Router()
const cookieParser = require('cookie-parser')
const usersModel = require('../model/usersModel')
let {resolve} = require('path')
router.use(cookieParser())
router.get('/login',(req,res)=>{
  // let url = resolve(__dirname,'../public/login.html')
  // res.sendFile(url)
  const {email} = req.query
  res.render('login',{errMsg:{email}})
})
router.get('/register',(req,res)=>{
  // let url = resolve(__dirname,'../public/register.html')
  // res.sendFile(url)
  res.render('register',{errMsg:{}})
})

//用于展示个人中心界面的路由，无其他任何逻辑 ----- UI路由
router.get('/user_center',(req,res)=>{
  const {_id} = req.cookies
  if(_id){
    //去数据库中查找是否有此id
    //查到了--获取该id对应的昵称
    usersModel.findOne({_id},function (err,data) {
      if(!err && data){
        //进入此判断意味着：用户不仅携带了id，而且id有效
        res.render('userCenter',{nickName:data.nick_name})
      }else{
        //进入此处意味着：1.与数据库交互时产生了错误。2.用户非法篡改了cookie
        res.redirect('http://localhost:3000/login')
      }
    })
  }else{
    //进入此处意味着：1.用户的cookie过期了。2.用户清理了浏览器缓存。3.用户根本没有登录过，直接访问的个人中心。
    res.redirect('http://localhost:3000/login')
  }
})
module.exports = function () {
  return router
}
