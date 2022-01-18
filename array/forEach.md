## Array.prototype.forEach
###概述
`forEach()` 方法对数组的每个元素执行一次给定的函数。
### 参数
- callback
    - currentValue
    - index
    - arr
- thisArg
### 要点
  1.跳过数组中未被初始化的元素（`empty`），不执行回调函数

  2.无返回值
### 实现
```js

Array.prototype._forEach = function (callback, thisArg) {
    if (!this) throw new TypeError('');
    if (typeof callback !== 'function') throw new TypeError(callback + 'must be a function!')

    const arr = this,
          len = arr.length;

    for (let i = 0; i < len; i++) {
        // 对未初始化的元素empty不执行回调（未被初始化的元素下标 index in arr === false）
        if (i in arr) {
            const cur = arr[i];
            callback.call(thisArg, cur, i, arr);
        }
    }
};

// 测试
const arr = [1, 2, 2, , , , , , 10];
arr._forEach(item => item * 2);
console.log(arr);      // [1, 2, 3, empty * 5, 10]
```


