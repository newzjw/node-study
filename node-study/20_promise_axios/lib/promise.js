/*
 * @Author: your name
 * @Date: 2021-07-11 10:23:51
 * @LastEditTime: 2021-07-15 22:49:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-study\20_promise_axios\lib\promise.js
 */
(function (window) {
  const PENDING = 'pending' // 初始未确定的状态
  const RESOLVED = 'resolved' // 成功的状态
  const REJECTED = 'rejected' // 失败的状态

  /**
   * Promise构造函数
   * @param {*} excutor 执行器函数
   */
  function Promise(excutor) {
    // Promise的实例对象
    const self = this
    // 状态属性, 初始值为pending, 代表初始未确定的状态
    self.status = PENDING
    // 用来存储结果数据的属性, 初始值为undefined，可能是value，可能是reason
    self.data = undefined
    // 保存回调函数，由用户指定{onResolved(){}, onRejected(){}}
    self.callbacks = []

    /**
     * 将promise的状态改为成功resolved, 指定成功的value
     * @param {*} value 
     */
    function resolve(value) {
      // 如果当前不是pending, 直接结束
      if (self.status !== PENDING) return

      self.status = RESOLVED // 将状态改为成功
      self.data = value // 保存成功的value
      // 异步调用所有缓存的待执行成功的回调函数
      if (self.callbacks.length > 0) {
        // 启动一个延迟时间为0的定时器, 在定时器的回调中执行所有成功的回调
        setTimeout(() => {
          self.callbacks.forEach(cbsObj => {
            cbsObj.onResolved(value)
          })
        })
      }
    }

    /**
     * 将promise的状态改为失败rejected, 指定失败的reason
     * @param {*} reason 
     * @returns 
     */
    function reject(reason) {
      // 如果当前不是pending, 直接结束
      if (self.status !== PENDING) return
      self.status = REJECTED // 将状态改为失败
      self.data = reason // 保存reason数据
      // 异步调用所有缓存的待执行失败的回调函数
      if (self.callbacks.length > 0) {
        // 启动一个延迟时间为0的定时器, 在定时器的回调中执行所有失败的回调
        setTimeout(() => {
          self.callbacks.forEach(cbsObj => {
            cbsObj.onRejected(reason)
          })
        })
      }
    }

    // 当实例化一个promise对象的时候，执行器就调用了，所以定义的时候就要调用excutor来启动异步任务
    try {
      excutor(resolve, reject)
    } catch (error) { // 执行器执行出错, 当前promise变为失败
      console.log('-----')
      reject(error)
    }
  }

  /* 
  用来指定成功/失败回调函数的方法
      1). 如果当前promise是resolved, 异步执行成功的回调函数onResolved
      2). 如果当前promise是rejected, 异步执行成功的回调函数onRejected
      3). 如果当前promise是pending, 保存回调函数
  返回一个新的promise对象
      它的结果状态由onResolved或者onRejected执行的结果决定
      2.1). 抛出error ==> 变为rejected, 结果值为error
      2.2). 返回值不是promise   ==> 变为resolved, 结果值为返回值
      2.3). 返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
  */
  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this // promise对象

    onResolved = typeof onResolved === 'function' ? onResolved : value => value // 将value向下传递
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason } // 将reason向下传递

    return new Promise((resolve, reject) => { // 什么时候改变它的状态

      /* 
      1. 调用指定的回调函数
      2. 根据回调执行结果来更新返回promise的状态
      */
      function handle(callback) {
        try {
          const result = callback(self.data)
          if (!(result instanceof Promise)) { //  2.2). 返回值不是promise   ==> 变为resolved, 结果值为返回值
            resolve(result)
          } else { // 2.3). 返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
            result.then(
              value => resolve(value),
              reason => reject(reason)
            )
            // result.then(resolve, reject)
          }
        } catch (error) { // 2.1). 抛出error ==> 变为rejected, 结果值为error
          reject(error)
        }
      }

      // 1). 如果当前promise是resolved, 异步执行成功的回调函数onResolved
      // 2). 如果当前promise是rejected, 异步执行成功的回调函数onRejected
      // 3). 如果当前promise是pending, 保存回调函数
      if (self.status === RESOLVED) {
        setTimeout(() => {
          // onResolved(self.data)
          handle(onResolved)
        })
      } else if (self.status === REJECTED) {
        setTimeout(() => {
          // onRejected(self.data)
          handle(onRejected)
        })
      } else { // PENDING
        self.callbacks.push({
          // onResolved,onRejected
          onResolved(value) {
            handle(onResolved)
          },
          onRejected(reason) {
            handle(onRejected)
          }
        })
      }
    })
  }

  window.Promise = Promise
})(window)