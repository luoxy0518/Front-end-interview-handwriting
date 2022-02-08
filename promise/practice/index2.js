/**
 * 宏任务  MacroTask -> Max
 * script / UI渲染 / setTimeout / setInterval / setImmediate
 * setImmediate: IE新版本/Edge/NodeJS Node.js 0.10+ 
 * messageChannel / requestAnimationFrame / 用户交互事件 / ajax
 * 
 * 微任务 MicroTask -> Mix
 * promise.then / mutationObserver / process.nextTick
 * 
 * vuejs -> $nextTick
 * 
 * $nextTick(() => {
 * 
 * });
 * 
 * setImmediate
 */

// setTimeout(() => {
//   console.log('over');
//   console.log('over');
//   console.log('over');
//   console.log('over');
//   console.log('over');
//   console.log('over');
// }, 0);

// setImmediate(() => {
//   console.log('over');
//   console.log('over');
//   console.log('over');
//   console.log('over');
//   console.log('over');
//   console.log('over');
// })

// console.log('starting');
// console.log('operating');

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// setImmediate(() => {
//   console.log('setImmediate');
// });

// -------------------------------

/**
 * messageChannel
 */

// const oMess1 = document.querySelector('#mess1'),
//       oMess2 = document.querySelector('#mess2'),
//       oBtn1 = document.querySelector('#btn1'),
//       oBtn2 = document.querySelector('#btn2');

// const channel = new MessageChannel();

// const { port1, port2 } = channel;

// oBtn1.addEventListener('click', sendMessage1, false);
// oBtn2.addEventListener('click', sendMessage2, false);
// port1.onmessage = getMessage1;
// port2.onmessage = getMessage2;

// function sendMessage1 () {
//   port2.postMessage('I am PORT-1.');
// }

// function sendMessage2 () {
//   port1.postMessage('I am PORT-2.');
// }

// function getMessage1 (e) {
//   oMess2.textContent = e.data;
// }

// function getMessage2 (e) {
//   oMess1.textContent = e.data;
// }

// import port2 from './demo';

// ;(() => {
//   port2.postMessage('This is new TITLE');
//   port2.onmessage = function (e) {
//     console.log(e.data);
//   }
// })();

// ------------------------------

/**
 * requestAnimationFrame vs setInterval
 * 
 * 1. 布局绘制的逻辑不同
 *    setInterval: 回调有多少次DOM操作，进行多少次计算、绘制
 *    requestAnimationFrame: 把所有DOM操作集中起来，一次性进行统一的计算并进行统一的绘制
 * 
 * 2. 窗口最小化时，运行情况不同
 *    setInterval: 一直执行回调函数
 *    requestAnimationFrame: 在最小化窗口时，暂停程序，页面打开时，从暂停的时候，重新开始
 * 
 * 3. 导致无意义的回调执行 -> 重绘重拍(计时时间间隔小于刷新率)
 *    setInterval(step, 0)
 */

// const element = document.getElementById('box');
// let start;

// function step(timestamp) {
//   if (start === undefined) {
//     start = timestamp;
//   }
    
//   const elapsed = timestamp - start;

//   //这里使用`Math.min()`确保元素刚好停在200px的位置。
//   element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

//   if (elapsed < 2000) { // 在两秒后停止动画
//     window.requestAnimationFrame(step);
//   }
// }

// window.requestAnimationFrame(step);

// let px = 0;
// let t = null;

// function step () {
//   px ++;

//   element.style.transform = 'translateX(' + px + 'px)';

//   if (px >= 200) {
//     clearInterval(t);
//   }
// }

// t = setInterval(step, 1000 / 60);

// let t = null,
//     i = 0,
//     j = 0;

// t = setInterval(() => {
//   console.log('setInterval', i ++);
// }, 1000);

// function step () {
//   setTimeout(() => {
//     window.requestAnimationFrame(step);
//     console.log('requestAnimationFrame', j ++);
//   }, 1000);
// }

// window.requestAnimationFrame(step);

// ----------------------

/**
 * MutationObserver
 * 
 * mutate -> v
 * mutation -> n 变化
 * 
 * observe -> v 观察
 * observer -> n 观察者
 * object -> ob -> 相反的  对面的
 * oppsite -> 相反的 -> ob op -> 对面的 相反的
 * 
 * ject -> 物体 -> object -> 对面的物体 -> 对象 -> 物件
 * ob serve/keep -> 看对面的东西  observe观察
 */

// const oTarget = document.getElementById('app');

// function callback (target) {
//   console.log(target);
// }

// function cb (mutationList, observer) {
//   mutationList.forEach(mutation => {
//     callback(mutation);
//   })
// }

// const observer = new MutationObserver(cb);

// observer.observe(oTarget, {
//   attributes: true,
//   childList: true,
//   subtree: true
// });

// const oTitle = oTarget.querySelector('h1');

// oTitle.innerText = 'This is TITLE';
// oTitle.className = 'title';

// const oPara = document.createElement('p');
// oPara.innerText = 'This is CONTENT.';
// oTarget.appendChild(oPara);

// ----------------------------

// 作为微任务是优先于promise运行的

process.nextTick(() => {
  console.log('nextTick1');
})

Promise.resolve().then(() => {
  console.log('Promise');
});

process.nextTick(() => {
  console.log('nextTick2');
})

setTimeout(() => {
  console.log('setTimeout');
}, 0);

process.nextTick(() => {
  console.log('nextTick3');
})












