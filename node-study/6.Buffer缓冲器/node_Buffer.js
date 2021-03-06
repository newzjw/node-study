/*
* 1.Buffer是什么？
*    1.它是一个【类似于数组】的对象，用于存储数据（存储的是二进制数据）。
*    2.Buffer的效率很高，存储和读取很快，它是直接对计算机的内存进行操作。
*    3.Buffer的大小一旦确定了，不可修改。
*    4.每个元素占用内存的大小为1字节。
*    5.Buffer是Node中的非常核心的模块，无需下载、无需引入,直接即可使用
* */

//1.使用new关键字创建一个Buffer实例，即将废弃，因为：1.效率极低；2.存在一些性能问题
let buf = new Buffer(10)
console.log(buf)

//2.使用Buffer.alloc创建一个Buffer实例，效率比new关键字稍高
let buf2 = Buffer.alloc(10)
console.log(buf2)

//3.Buffer.allocUnsafe创建一个Buffer实例，效率最高的一种方式
/*
* 1.输出的Buffer为什么不是二进制？ ----- 输出的是16进制，但是存储的是二进制吗，输出的时候会自动转16进制。
* 2.输出的Buffer不为空？ ----- 在堆里开辟空间，可能残留着别人用过的数据，所以allocUnsafe
* */
let buf3 = Buffer.allocUnsafe(10)
console.log(buf3)

//4.将一个字符串保存在Buffer中
let str = 'HELLO ATGUIGU'
let buf4 = Buffer.from(str)
console.log(buf4)


