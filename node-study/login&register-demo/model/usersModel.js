//把数据库想象成你家的别墅
let mongoose = require('mongoose')

// 1.引入模式对象
let Schema = mongoose.Schema

// 2.创建约束对象
let usersRule = new Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  nick_name:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now()
  },
  enable_flag:{
    type:String,
    default:'Y'
  }
})

//3.创建模型对象
module.exports = mongoose.model('users',usersRule) //用于生成某个集合所对应的模型对象

