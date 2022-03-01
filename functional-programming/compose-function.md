## 函数组合（compose）
### 概述
函数组合指：将多个函数**按顺序执行**，前一个函数的返回值，会作为下一个函数的入参，最终返回最后的结果 的一种`js`编程技术。

函数组合就是一种将已被分解的简单任务组合成复杂任务的过程。

### 优点
- 函数单一职责化
- 减少冗余代码
### 使用场景
需求： 输入`a,b`，先将 `a + b` 的和变为2倍，再平方，最后打印出来。

以下方式虽然可以完成需求，但是随着需求复杂度增加，代码最终会形成为`fn3(fn2(fn1(fn0(x))))`，会很难阅读。
```js
const double = (a, b) => (a + b) * 2;
const square = (val) => val ** 2;
const log = val => console.log(val)

// 常规做法：
log(square(double(1,2)));
```
### 实现
编程思想：多个函数按照顺序执行（本文是从左到右），前一个函数的返回值会作为后一个函数的入参。
```js
const double = (a, b) => (a + b) * 2;
const square = (val) => val ** 2;
const log = val => console.log(val)

// compose工具函数
function compose(...fns) {
    let length = fns.length,
        startIndex = 0;
    // 检验元素是否为函数类型
    fns.forEach(fn => {
        if(typeof fn !== 'function')  throw new TypeError('arguments item must be a function!');
    });

    if (length === 1) return fns[0];

    // 传入的初始参数
    return function (...args) {
        // 第一次传参会作为初始值
        let result = fns[startIndex++].apply(this, args);

        while (startIndex < length) {
            // 前一次函数的返回值，会作为下一次函数的入参
            result = fns[startIndex++].call(this, result);
        }
        return result;
    }
}

compose(double, square, log, 1)(1, 2);      // 36
```
