## Function.prototype.apply
### 概述
`apply()` 方法调用一个具有给定 `this` 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
### 参数
- `thisArg` 运行函数时的 `this` 指向
- `args` 一个数组或者类数组对象 
### 要点
1. 在非严格模式下
    - `this` 为空，默认指向 `window`
    - `this` 为简单类型，指向其对应的包装类（`Object(thisArg)` 为简单类型对应的包装类）
2. 使用 "调用对象中的方法，`this` 指向对象" 的思想
    - 将方法添加到对象中，调用方法并传参，调用完毕将方法删除

### 实现    
```js
Function.prototype._call = function (thisArg = window, args) {
const fn = this,
// 使用Symbol类型，将添加的key私有化
uniqueKey = Symbol(Math.random());

    // 将简单类型转换为其包装类
    thisArg = Object(thisArg);
    // 添加方法到this上
    thisArg[uniqueKey] = fn;

    const result = thisArg[uniqueKey](...args);
    // 执行完毕后，将方法删除
    delete thisArg[uniqueKey];

    return result;
}


// 测试
function sum(c) {
return this.a + this.b + c;
}

console.log(sum.apply({a: 1, b:2}, [3]));

```
