/*
 * @Author: your name
 * @Date: 2021-08-20 17:01:16
 * @LastEditTime: 2021-08-23 06:19:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-study\4.Node中的文件操作(读取)\test.js
 */
let fs = require('fs')

fs.readFile(__dirname + '/test.txt', 'utf-8', (err, data) => {
  if (err) {
    throw err
  } else {
    console.log(data) // 1212121212121
  }
})
console.log('-------')
let res = getFileByPath(__dirname + '/test.txt')
console.log(res)

function getFileByPath(fpath) {
  fs.readFile(fpath, 'utf-8', (err, data) => {
    if (err) {
      throw err
    } else {
      return data
    }
  })
}

function getFileByPath2(fpath, callback) {
  fs.readFile(fpath, 'utf-8', (err, data) => {
    if (err) {
      throw err
    } else {
      callback(data)
    }
  })
}
getFileByPath2(__dirname + '/test.txt', (data)=> {
  console.log(data + 'ttt')
})

function getFileByPath2(fpath, resolved, rejected) {
  fs.readFile(fpath, 'utf-8', (err, data) => {
    if (err) {
      return rejected(err)
    } else {
      resolved(data)
    }
  })
}