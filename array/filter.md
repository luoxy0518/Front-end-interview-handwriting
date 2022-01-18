## Array.prototype.filter
### 概述
`filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
### 参数
- `callback`
    - `currentValue`
    - `index`
    - `arr`
- `thisArg`
### 要点
1.跳过数组中未被初始化的元素（`empty`），不执行回调函数

2.`callback` 执行后返回 `true` 则保留该元素，`false` 则不保留

3.返回一个新数组

### 实现
```js
Array.prototype._filter = function (callback, thisArg) {
    if (!this) throw new TypeError('');
    if (typeof callback !== 'function') throw new TypeError(callback + 'is not a function!');

    const arr = this,
        len = arr.length,
        result = [];

    for (let i = 0; i < len; i++) {
        if (i in arr) {
            // 回调函数执行后，如果返回值为true则保留该元素
            if(callback.call(thisArg, arr[i], i, arr)) result.push(arr[i]);
        }
    }
    return result;
}

console.log()

// 测试
const filtered = [12, 5, 8, 130, 44]._filter(ele => ele >= 10);
console.log(filtered);
```
