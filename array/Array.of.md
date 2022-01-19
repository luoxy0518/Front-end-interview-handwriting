## Array.of
### 概述
`Array.of()` 方法创建一个新数组
### 要点
**与`new Array()`创建新数组的区别**：

当**参数个数为1且为数字类型**时，`new Array(number)`会生成长度为`number`，值为`empty`的数组；而`Array.of(number)`会生成长度为`1`，元素为`number`的数组。

- 这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。
- `Array.of()`基本上可以用来替代`Array()`或`new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一

```js
const arr1 = new Array(10);
// arr1 ：[empty × 10]

const arr2 = Array.of(10);
// arr2 : [10] 
```
### 实现
```js
// Array.of(一组参数) -- 将一组参数转换为数组实例
Array._of = function (...args) {
    return args;
    
    // ES5写法：
    // return [].slice.call(arguments);
}
```
