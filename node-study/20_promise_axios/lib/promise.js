/*
 * @Author: your name
 * @Date: 2021-07-11 10:23:51
 * @LastEditTime: 2021-07-12 13:36:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-study\20_promise_axios\lib\promise.js
 */
(function(window){
  const PENDING = 'pending' // 初始未确定的状态
  const RESOLVED = 'resolved' // 成功的状态
  const REJECTED = 'rejected' // 失败的状态

  /**
   * Promise构造函数
   * @param {*} excutor 执行器函数
   */
  function Promise(excutor) {
    
  }

  Promise.prototype.then = function (onResolved, onRejected) {
    
  }

  window.Promise = Promise
})(window)