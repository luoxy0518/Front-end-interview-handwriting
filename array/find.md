### Array.prototype.find
### 概述
`find` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`。
### 参数
- `callback`
    - `currentValue`
    - `index`
    - `arr`
- `thisArg`
### 要点
1.跳过数组中未被初始化的元素（`empty`），不执行回调函数

2.返回第一个符合条件的元素，否则返回 `undefined`

### 实现
```js
Array.prototype._find = function (callback, thisArgs) {
    if (!this) throw new TypeError('this is null or undefined');
    if (typeof callback !== 'function') throw new TypeError(callback + 'is not a fuunction');

    const arr = this,
        len = arr.length;


    for (let i = 0; i < len; i++) {
        if (!(i in arr)) continue;

        if (callback.call(thisArgs, arr[i], i, arr)) return arr[i];
    }
}

// 测试
const inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

console.log(inventory._find(fruit => fruit.name === 'cherries')); // { name: 'cherries', quantity: 5 }

```
