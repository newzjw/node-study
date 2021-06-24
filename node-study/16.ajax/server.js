/*
 * @Author: your name
 * @Date: 2021-06-24 06:53:07
 * @LastEditTime: 2021-06-24 09:52:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-study\16.ajax\server.js
 */
const express = require('express')

const app = express()
// 用于解析post的请求体参数，要求请求参数的编码类型必须为urlencoded
app.use(express.urlencoded({extended:true}))
app.get('/ajax_get', (req, res)=> {
  console.log(req.query)
  res.send('你发来的get请求我收到了')
})

app.post('/ajax_post', (req, res)=> {
  console.log(req.body)
  res.send('你发来的post请求我收到了')
})

app.listen(3001, (err) => {
  if (err) {
    console.log('服务器连接失败', err)
  } else {
    console.log('服务器连接成功')
  }
})