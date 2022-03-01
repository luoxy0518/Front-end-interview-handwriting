## Function.prototype.bind
### 概述 
`bind()` 方法创建一个新的函数。

在 `bind` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
### 参数
- `thisArg` 运行函数时的 `this` 指向
- `args` 一个数组或者类数组对象
### 要点
1.`bind` 方法执行后返回一个新的函数，可以传递部分参数

2.执行新函数时，传入的函数要与调用 `bind` 时的函数进行拼接

3.当新函数被 `new` 关键字调用时，`this` 指向实例，而不是 `bind` 指定的 `this`

4.返回的新函数，要继承原函数原型链的值（圣杯模式）

### 实现
```js
Function.prototype._bind = function (thisArg, ...args) {
    const fn = this;

    // bind会返回一个新的函数
    function newFn (...args2) {
        // 当函数被 new 关键字实例化时，此时this指向实例 而不是 bind指定的this
        thisArg = this instanceof newFn ? this : thisArg;
        // 执行函数，并且改变this指向
        // bind返回的是一个偏函数，所以需要把两次的函数参数拼接到一起，形成最终的参数
        return fn.apply(thisArg, [...args2, ...args]);
    }

    // 将 返回的新函数 的原型 与 原函数的原型 保持一致
    // 使用圣杯模式，防止继承原型后由于引用类型导致的相互影响
    function Buffer(){}
    Buffer.prototype = fn.prototype;
    newFn.prototype = new Buffer();

    return newFn;
}


// 测试
const obj = {name: 'objName'}
function fn(a, b, c) {
    this.name = a;
    this.b = b;
    this.c = c;
    this.print();
}
fn.prototype.print = function () {
    console.log('printing');
}

const newFn = fn._bind(obj, '2');
const newObj = new newFn(2, '3');
// printing

console.log(newObj);
// { name: 2, b: '3', c: '2' }
```
