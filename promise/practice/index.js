// PPT
// document.body.style.backgroundColor = 'orange';
// console.log(1);

// setTimeout(() => {
//   document.body.style.backgroundColor = 'green';
//   console.log(2);
// }, 100);

// Promise.resolve(3).then(num => {
//   document.body.style.backgroundColor = 'purple';
//   console.log(num);
// });

// console.log(4);

/**
 * bgColor: orange -> 没渲染
 * 1
 * 4
 * bgColor: purple -> 渲染
 * 3
 * bgColor: green -> 没渲染
 * 2
 * bgColor: green -> 渲染
 */

// ------------------------------------------

/**
 * callback 回调   回来调用  cb
 *
 * 执行栈
 * promise1.then cb -> p1
 * setTimeout1 cb   -> s1
 * promise2.then cb -> p2
 * setTimeout2 cb   -> s2
 *
 * 宏任务        setTimeout1    x     setTimeout2     x
 *   回调队列 -> setTimeout1 cb x     setTimeout2 cb  x
 *
 * 微任务        promise1        x    promise2         x
 *   回调队列 -> promise1.then cb x   promise2.then cb x
 *
 *
 */

/**
 * 执行栈
 * Promise1.then cb   ->   p1
 * setTimeout1 cb     ->   s1
 * promise2-1.then cb ->   p2-1
 * promise2-2.then cb ->   p2-2
 * setTimeout2-1 cb   ->   s2-1
 * setTimeout2-2 cb   ->   s2-2
 * 宏任务     setTimeout1    x  setTimeout2-1    x  setTimeout2-2    x
 *   回调队列 setTimeout1 cb x  setTimeout2-1 cb x  setTimeout2-2 cb x
 *
 * 微任务     Promise1         x  Promise2-1         x promise2-2 x
 *   回调队列 Promise1.then cb x  promise2-1.then cb x promise2-2.then cb x
 */

// script
// Promise.resolve().then(() => {
//   console.log('p1');

//   setTimeout(() => {
//     console.log('s2-1');
//   }, 0);

//   setTimeout(() => {
//     console.log('s2-2');
//   }, 0)
// })

// setTimeout(() => {
//   console.log('s1');
//   Promise.resolve().then(() => {
//     console.log('p2-1');
//   }).then(() => {
//     console.log('p2-2');
//   })
// }, 0)

// -----------------------------------------

/**
 * 执行栈
 * script
 * 1
 * 3
 * 4
 * 6
 * promise.then err cb -> error 5
 * setTimeout1 cb ->      2
 *
 * 宏任务  setTimeout1
 *        setTimeout1 cb
 * 微任务  promise1
 *        promise.then err cb
 *
 *              异步任务            异步任务
 * 同步代码 -> 微任务代码 -> 渲染 -> 宏任务代码
 */

/**
 * 执行栈
 * script
 * 1
 * 3
 * 4
 * 6
 * promise1.then cb
 *   ? setTimeout1 cb  ->  10
 * setTimeout2 cb -> p1 5
 * setTimeout1 cb
 * promise2.then cb ->p2 2
 * 宏任务  setTimeout1    x     setTimeout2     x
 *        setTimeout1 cb x     setTimeout2 cb  x
 * 微任务  promise1          x   promise2         x
 *        promise1.then cb  x   promise2.then cb x
 */

// console.log(1);

// setTimeout(() => {
//   Promise.resolve().then(() => {
//     console.log('p2', 2);
//   })
// }, 0);
// /**
//  * Promise(executor)  执行器  同步代码
//  *
//  */
// new Promise(function(resolve,reject){
//     console.log(3);
//     resolve('');
//     console.log(4);
// }).then(res=>{
//     setTimeout(() => {
//       console.log('p1', 5);
//     }, 0);
// })
// console.log(6);

// --------------------------------------------

/**
 *
 * async函数  默认会返回一个promise实例
 * await 必须存在在async 函数中
 *
 * await test()   yield
 * test() -> promise对象
 *
 * await test() -> test().then(res => {
 * })
 *
 *
 */

// async function test () {}

// console.log(test());

/**
 * 执行栈
 * script
 * function -> res
 * 3
 * 1
 * 2
 * 5
 * 6
 * 7
 * 4
 *
 * 宏任务
 *
 * 微任务 awaitPromise         x
 *       awaitPromise.then cb x
 */

/**
 * 执行栈
 * script
 * function -> res
 * 1
 * 8
 * 5
 * setTimeout1 cb
 * promise1.then cb -> 4
 * setTimeout2 cb -> 2
 * setTimeout3 cb -> 6
 * setTimeout4 cb -> 7
 * setTimeout5 cb -> 3
 *
 * 宏任务 setTimeout1        x
 *         setTimeout1 cb   x
 *       setTimeout2        x
 *         setTimeout2 cb   x
 *       setTimeout3        x
 *         setTimeout3 cb   x
 *       setTimeout4        x
 *         setTimeout4 cb   x
 *       setTimeout5
 *         setTimeout5 cb
 * 微任务 awaitPromise           x
 *         awaitPromise.then cb x
 *       promise1               x
 *         promise1.then cb     x
 *
 *
 */

// let res = function () {
//   console.log(1)
//   return new Promise((resolve, reject) => {
//     // setTimeout2
//     setTimeout(() => {
//       new Promise((resolve) => {
//         console.log(2);
//         // setTimeout5
//         setTimeout(() => {
//           console.log(3);
//         })
//       })
//     }, 0)
//     resolve(5);
//   })
// }

// new Promise(async (resolve, reject) => {
//   // setTimeout1
//   setTimeout(() => {
//     // promise1
//     Promise.resolve().then(() => {
//       console.log(4);
//     })
//   }, 0);
//   let test = await res();
//   /**
//    * await res()
//    *
//    * new Promise((resolve, reject) => {
//       console.log(2);
//       resolve(4);
//     }).then((res) => {})
//    *

//    * res().then((res) => {
//    *   console.log(test);
//    * })
//    *
//    */
//   console.log(test);
// });

// // setTimeout3
// setTimeout(() => {
//   console.log(6);
// }, 0)

// new Promise((resolve, reject) => {
//   // setTimeout4
//   setTimeout(() => {
//     console.log(7);
//   }, 0)
// });

// console.log(8);

// -----------------------------------------

// const oBtn = document.getElementById('btn');
// 宏任务中，事件处理函数 -> 回调
/**
 * 执行栈
 * script
 * 1
 * 2
 * m1Promise.then cb -> m1
 * m1Promise.then cb -> m2
 *
 * 宏任务  addEvent1
 *          addEvent1 cb
 *        addEvent2
 *          addEvent2 cb
 *
 * 微任务  m1Promise
 *          m1Promise.then cb
 *
 *        m2Promise
 *          m2Promise.then cb
 *
 */

/**
 * 执行栈
 * script
 * addEvent1 cb ->
 * m1Promise.then cb -> m1
 * addEvent2 cb ->
 * m2Promise.then cb -> m2
 * setTimeout1 cb -> 1
 * setTimeout2 cb -> 2
 *
 * 宏任务 addEvent1     x
 *        addEvent1 cb x
 *       addEvent2     x
 *        addEvent2 cb x
 *       setTimeout1
 *        setTimeout1 cb
 *       setTimeout2
 *        setTimeout2 cb
 * 微任务  m1Promise            x
 *          m1Promise.then cb  x
 *        m2Promise            x
 *          m2Promise.then cb  x
 *
 */
// oBtn.addEventListener('click', () => {
//   // setTimeout1
//   setTimeout(() => {
//     console.log('1');
//   }, 0);

//   Promise.resolve('m1').then((str) => {
//     console.log(str);
//   });
// }, false);

// oBtn.addEventListener('click', () => {
//   // setTimeout2
//   setTimeout(() => {
//     console.log('2');
//   }, 0);

//   Promise.resolve('m2').then((str) => {
//     console.log(str);
//   });
// }, false);

/**
 * 执行栈
 * script
 * function -> handler1
 * function -> handler2
 * m1Promise cb -> m1
 * m2Promise cb -> m2
 * setTimeout1 cb -> 1
 * setTimeout2 cb -> 2
 *
 *
 * 宏任务 setTimeout1      x
 *         setTimeout1 cb x
 *       setTimeout2
 *         setTimeout2 cb
 *
 * 微任务 m1Promise      x
 *         m1Promise cb x
 *       m2Promise      x
 *         m2Promise cb x
 *
 */

// const handler1 = () => {
//   // setTimeout1
//   setTimeout(() => {
//     console.log('1');
//   }, 0);

//   Promise.resolve('m1').then((str) => {
//     console.log(str);
//   });
// }

// const handler2 = () => {
//   // setTimeout2
//   setTimeout(() => {
//     console.log('2');
//   }, 0);

//   Promise.resolve('m2').then((str) => {
//     console.log(str);
//   });
// }

/**
 * 执行栈
 * script
 * addEvent1 cb -> 1
 * m1Promise.then cb -> m1
 * addEvent2 cb -> 2
 * m2Promise.then cb -> m2
 *
 * 宏任务 addEvent1
 *         addEvent1 cb
 *       addEvent2
 *         addEvent2 cb
 * 微任务 m1Promise
 *         m1Promise.then cb
 *       m2Promise
 *         m2Promise.then cb
 *
 *
 *
 */

/**
 * 执行栈
 * function -> handler1
 * function -> handler2
 * 1
 * 2
 * m1Promise.then cb -> m1
 * m2Promise.then cb -> m2
 *
 * 宏任务
 *
 * 微任务  m1Promise
 *          m1Promise.then cb
 *        m2Promise
 *          m2Promise.then cb
 *
 */

// const handler1 = () => {
//   console.log('1');

//   Promise.resolve('m1').then((str) => {
//     console.log(str);
//   });
// }

// const handler2 = () => {
//   console.log('2');

//   Promise.resolve('m2').then((str) => {
//     console.log(str);
//   });
// }

// handler1();
// handler2();

// oBtn.click();

// -----------------------------
/**
 * 执行栈
 * script
 * start
 * promise 1
 * promise 2
 * setInterval cb -> setInterval
 * setTimeout1 cb -> setTimeout 1
 * promise3.then cb -> promise 3
 * promise4.then cb -> promise 4
 * setInterval cb   -> setInterval
 * setTimeout2 cb  -> setTimeout 2
 * promise6.then cb -> promise 5
 * promise7.then cb -> promise 6
 * promise8.then cb -> clearInterval
 *
 * 宏任务 setInterval        x
 *         setInterval cb   x
 *       setTimeout1        x
 *         setTimeout1 cb   x
 *       setInterval        x
 *         setInterval cb   x
 *       setTimeout2        x
 *         setTimeout2 cb   x
 *       setInterval        x
 *         setInterval cb   x
 *
 * 微任务 promise1           x
 *         promise1.then cb x
 *       promise2           x
 *         promise2.then cb x
 *       promise3           x
 *         promise3.then cb x
 *       promise4           x
 *         promise4.then cb x
 *       promise5           x
 *         promise5.then cb x
 *       promise6           x
 *         promise6.then cb x
 *       promise7           x
 *         promise7.then cb x
 *       promise8           x
 *         promise8.then cb x
 *
 */

// console.log('start');

// const interval = setInterval(() => {
//   console.log('setInterval')
// }, 0)

// // setTimeout1
// setTimeout(() => {
//   console.log('setTimeout 1')
//   Promise.resolve()
//       // promise3
//       .then(() => {
//         console.log('promise 3')
//       })
//       // promise4
//       .then(() => {
//         console.log('promise 4')
//       })
//       // promise5
//       .then(() => {
//         // setTimeout2
//         setTimeout(() => {
//           console.log('setTimeout 2')
//           Promise.resolve()
//               // promise6
//               .then(() => {
//                 console.log('promise 5')
//               })
//               // promise7
//               .then(() => {
//                 console.log('promise 6')
//               })
//               // promise8
//               .then(() => {
//                 clearInterval(interval)
//               })
//         }, 0)
//       })
// }, 0)

// Promise.resolve()
// // promise1
// .then(() => {
//     console.log('promise 1')
// })
// // promise2
// .then(() => {
//     console.log('promise 2')
// });

// ------------------------------

/**
 * 执行栈
 * script
 * 2
 * promise1.then cb -> then1
 *                     then4
 * promise2.then cb -> then2
 *                     then5
 * promise3.then cb -> then6
 * setTimeout1 cb -> setTimeout1
 * promise4.then cb -> then3
 * setTimeout2 cb -> setTimeout2
 * setTimeout3 cb -> setTimeout3
 *
 * 宏任务
 *   setTimeout1       x
 *      setTimeout1 cb x
 *   setTimeout2       x
 *      setTimeout2 cb x
 *   setTimeout3       x
 *      setTimeout3 cb x
 *
 * 微任务
 *   promise1           x
 *     promise1.then cb x
 *   promise2           x
 *     promise2.then cb x
 *   promise3           x
 *     promise3.then cb x
 *   promise4           x
 *     promise4.then cb x
 */

// setTimeout1
// setTimeout(() => {
//   console.log('setTimeout1');
//    // setTimeout3
//    setTimeout(() => {
//       console.log('setTimeout3');
//   },1000);
//   // promise4
//   Promise.resolve().then(data => {
//       console.log('then3');
//   });
// },1000);

// // promise1
// Promise.resolve().then(data => {
//   console.log('then1');
//   console.log('then4')
//   // promise3
//   Promise.resolve().then(data11=>{console.log('then6')})
// });

// // promise2
// Promise.resolve().then(data => {
//   console.log('then2');
//   console.log('then5')
//   // setTimeout2
//   setTimeout(() => {
//       console.log('setTimeout2');
//   },1000);
// });

// console.log(2);

// -----------------------

/**
 * 执行栈
 * script
 * 2
 * 6
 * promise1.then cb -> 3
 * promise2.then cb -> 4
 * setTimeout1 cb -> 1
 *
 * 宏任务
 *   setTimeout1
 *     setTimeout1 cb
 *
 * 微任务
 *   promise1           x
 *     promise1.then cb x
 *   promise2           x
 *     promise2.then cb x
 *
 */

// setTimeout1
// setTimeout(function () {
//   console.log(1)
// }, 0);

// new Promise(function (resolve, reject) {
//   console.log(2);
//   resolve();
//   // promise1
// }).then(function () {
//   console.log(3)
//   // promise2
// }).then(function () {
//   console.log(4)
// });

// console.log(6);

// --------------------------

/**
 * 执行栈
 * script
 * 1
 * 5
 * 11
 * 13
 * promise1.then cb -> 6
 * promise2.then cb -> 12
 * setTimeout1 cb -> 2
 *                   3
 * promise4.then cb -> 4
 * setTimeout2 cb -> 7
 * setTimeout3 cb -> 8
 *                   9
 * promise5.then cb -> 10
 *
 * 宏任务
 *   setTimeout1      x
 *     setTimeout1 cb x
 *   setTimeout2      x
 *     setTimeout2 cb x
 *   setTimeout3      x
 *     setTimeout3 cb x
 *
 * 微任务
 *   promise1           x
 *     promise1.then cb x
 *   promise2           x
 *     promise2.then cb x
 *   promise4           x
 *     promise4.then cb x
 *   promise5           x
 *     promise5.then cb x
 */

// console.log('1');
// //setTimeout1
// setTimeout(function() {
//     console.log('2');
//     new Promise(function(resolve) {
//         console.log('3');
//         resolve();
//       // promise4
//     }).then(function() {
//         console.log('4');
//     })
// })
// new Promise(function(resolve) {
//     console.log('5');
//     resolve();
//     // promise1
// }).then(function() {
//     console.log('6');
// })

// // setTimeout2
// setTimeout(function() {
//     console.log('7');
// })

// // setTimeout3
// setTimeout(function() {
//     console.log('8');
//     new Promise(function(resolve) {
//         console.log('9');
//         resolve();
//         // promise5
//     }).then(function() {
//         console.log('10');
//     })
// })

// new Promise(function(resolve) {
//     console.log('11');
//     resolve();
//     // promise2
// }).then(function() {
//     console.log('12');
// })
// console.log('13');

// ----------------------

/**
 * 执行栈
 * script
 * script start
 * a1 start
 * async2
 * promise1
 * script end
 * awaitPromise.then cb -> a1 end
 * promise1.then cb -> promise2
 * setTimeout1 cb -> setTimeout
 *
 *
 * 宏任务
 *   setTimeout1          x
 *     setTimeout1 cb     x
 *
 * 微任务
 *   awaitPromise           x
 *     awaitPromise.then cb x
 *   promise1               x
 *     promise1.then cb     x
 */

// async function async1 () {
//   console.log('a1 start');
//   await async2();
//   /**
//    * // awaitPromise
//    * async2().then(res => {
//    *   console.log(a1 end);
//    * })
//    *
//    */
//   console.log('a1 end');
// }

// async function async2 () {
//   console.log('async2');
// }

// console.log('script start');

// // setTimeout1
// setTimeout(function () {
//   console.log('setTimeout');
// }, 0);

// async1();

// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve();
//   // promise1
// }).then(function () {
//   console.log('promise2');
// })

// console.log('script end');

// ---------------------------
/**
 * 执行栈
 * script
 * script start
 * async1 start
 * promise1
 * promise3
 * script end
 * promise1.then cb -> promise2
 * awaitPromise.then cb -> async1 end
 * promise2.then cb -> promise4
 * setTimeout1 cb -> setTimeout
 * 宏任务
 *   setTimeout1
 *     setTimeout1 cb
 *
 * 微任务
 *    promise1               x
 *      promise1.then cb     x
 *    awaitPromise           x
 *      awaitPromise.then cb x
 *    promise2               x
 *      promise2.then cb     x
 */

// async function async1() {
//   console.log('async1 start');
//   await async2();
//   /**
//    * awaitPromise
//    * async2().then((res) => {
//    *   console.log('async1 end');
//    * })
//    *
//    */
//   console.log('async1 end');
// }
// async function async2() {
//   new Promise(function (resolve) {
//       console.log('promise1');
//       resolve();
//       // promise1
//   }).then(function () {
//       console.log('promise2');
//   });
// }
// console.log('script start');

// // setTimeout1
// setTimeout(function () {
//   console.log('setTimeout');
// }, 0)
// async1();
// new Promise(function (resolve) {
//   console.log('promise3');
//   resolve();
//   // promise2
// }).then(function () {
//   console.log('promise4');
// });
// console.log('script end');

// --------------

/**
 * 执行栈
 * script
 * script start
 * async1 start
 * promise1
 * script end
 * awaitPromise.then cb
 * promise1.then cb -> promise2
 * setTimeout1 cb -> setTimeout3
 * setTimeout2 cb -> setTimeout2
 * setTimeout3 cb -> setTimeout1
 *
 * 宏任务
 *
 *   setTimeout1      x
 *     setTimeout1 cb x
 *   setTimeout2       x
 *     setTimeout2 cb  x
 *   setTimeout3       x
 *     setTimeout3 cb  x
 *
 * 微任务
 *   awaitPromise           x
 *     awaitPromise.then cb x
 *   promise1               x
 *     promise1.then cb     x
 */

// async function async1() {
//   console.log('async1 start');
//   await async2();
//   /**
//    * awaitPromise
//    * async2().then(res => {
//    *   // setTimeout3
//    *   setTimeout(function() {
//           console.log('setTimeout1');
//       },0)
//    *
//    * })
//    *
//    */
//   setTimeout(function() {
//       console.log('setTimeout1');
//   },0)
// }
// async function async2() {
//   // setTimeout2
//   setTimeout(function() {
//       console.log('setTimeout2')
//   },0)
// }
// console.log('script start');

// // setTimeout1
// setTimeout(function() {
//   console.log('setTimeout3');
// }, 0)
// async1();
// new Promise(function(resolve) {
//   console.log('promise1');
//   resolve();
//   // promise1
// }).then(function() {
//   console.log('promise2');
// });
// console.log('script end');

// -------------------------
/**
 * 执行栈
 * script
 * 1
 * Promise实例 -> promise
 * 5
 * getPromise -> promise2
 * 8
 * promise1.then cb -> 3
 * awaitPromise.then cb -> 6
 * setTimeout1 cb -> 2
 *
 * 宏任务
 * 
 *   setTimeout1
 *     setTimeout1 cb
 *
 * 微任务
 *   promise1           x
 *     promise1.then cb x
 *   awaitPromise           x
 *     awaitPromise.then cb x
 */

// var promise = new Promise((resolve) => {
//   console.log(1);
//   resolve();
// });

// // setTimeout1
// setTimeout(() => {
//   console.log(2);
// });

// // promise1
// promise.then(() => {
//   console.log(3);
// });
// var promise2 = getPromise();

// async function getPromise() {
//   console.log(5);
//   await promise;
//   /**
//    * //awaitPromise
//    * promise.then(() => {
//    *   console.log(6);
//    * })
//    * 
//    */
//   console.log(6);
// }
// console.log(8);

// --------------------

/**
 * 执行栈
 * script
 * function -> LazyMan
 * Hi i am Tony
 * new F();
 * setTimeout1 cb -> 等待了10秒....
 * 
 * 宏任务
 *   setTimeout1
 *     setTimeout1 cb
 * 
 * 
 * 微任务
 * 
 *  
 */

// const LazyMan = function (name) {
//   console.log(`Hi i am ${name}`);
//   function _eat(food){
//     console.log(`I am eating ${food}`);
//   }
//   const callbacks = [];
//   class F {
//     sleep(timeout) {
//       // setTimeout1
//       setTimeout(function () {
//         console.log(`等待了${timeout}秒....`);
//         // callback -> _eat
//         console.log(callbacks);
//         callbacks.forEach(cb=>cb())
//       }, timeout);
//       return this;

//     };

//     eat(food) {
//       callbacks.push(_eat.bind(null,food));
//       return this;
//     }
//   }
//   return new F();
// };

// LazyMan('Tony').sleep(10).eat('lunch').eat('meal');
