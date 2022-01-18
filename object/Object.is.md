## Object.is
### 概述
`Object.is()`方法判断两个值是否值相同
### 要点
- 与`==`不同
    - 当比较两个不同类型的数据时，`==` 会发生隐式类型转换，而`Object.is`不会。
- 与`===`不同
    - `NaN === NaN // false` `Object.is(NaN, NaN) // true`
    - `-0 === +0 // true` `Object.is(-0 , +0)  // false`
    
### 实现
```js
Object._is = function (x, y) {
    if (x === y) {
        if (x !== 0) return true;
        // 判断 +0 === -0
        return 1 / x === 1 / y;
    } else {
        // 判断NaN === NaN
        return x !== x && y !== y;
    }
}

// 测试
console.log(`__is('foo', 'foo'): ${Object._is('foo', 'foo')}`); // true

const __foo = { a: 1 };
const __bar = { a: 1 };
console.log(`__is(__foo, __foo): ${Object._is(__foo, __foo)}`); // true
console.log(`__is(__foo, __bar): ${Object._is(__foo, __bar)}`); // false
console.log(`__is([], []): ${Object._is([], [])}`); // false
console.log(`__is(null, null): ${Object._is(null, null)}`); // true

// 特例 +0 -0 | NaN NaN
console.log(`__is(0, -0): ${Object._is(0, -0)}`); // false
console.log(`__is(0, +0): ${Object._is(0, +0)}`); // true
console.log(`__is(-0, -0): ${Object._is(-0, -0)}`); // true
console.log(`__is(NaN, NaN): ${Object._is(NaN, NaN)}`); // true

```
