## 函数记忆
### 概述
函数记忆指，将上次的参数 与 计算结果 缓存起来，当下次调用函数时遇到相同的参数时，直接返回缓存的结果。

示例：
```js
function add(a, b) {
    return a + b;
}

// 假设 memoize 可以实现函数记忆
var memoizedAdd = memoize(add);

memoizedAdd(1, 2) // 3
memoizedAdd(1, 2) // 相同的参数，第二次调用时，从缓存中取出数据，而非重新计算一次
```
### 实现
> 实现这样一个 `memoize` 函数很简单，原理上只用把参数和对应的结果数据存到一个对象中，调用时，判断参数对应的数据是否存在，存在就返回对应的结果数据

```js

function memoize(f) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        console.log(key,cache);
        if (Reflect.has(cache, key)) return cache[key];

        return cache[key] = f.apply(this, args);
    }
}


function add(a, b) {
    return a + b;
}

// 假设 memoize 可以实现函数记忆
var memoizedAdd = memoize(add);
console.log(memoizedAdd);

console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd(1, 2)); // 相同的参数，第二次调用时，从缓存中取出数据，而非重新计算一次
```
### 何时适用
**需要大量重复的计算，或者大量计算又依赖于之前的结果**。例如计算`fibonacci`时，可以应用到函数记忆这个方法，来提高效率。

函数记忆只是一种编程技巧，**本质上是牺牲算法的空间复杂度以换取更优的时间复杂度**，在客户端 `JavaScript` 中代码的执行时间复杂度往往成为瓶颈，因此在大多数场景下，这种牺牲空间换取时间的做法以提升程序执行效率的做法是非常可取的。

### 推荐阅读
- [JavaScript专题之函数记忆 ](https://github.com/mqyqingfeng/Blog/issues/46)
