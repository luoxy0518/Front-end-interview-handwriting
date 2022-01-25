## Array.prototype.flat
### 概述
`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。（数组扁平化/数组降维/数组拉平）

### 参数
- `deep` 指要提取嵌套数组的结构深度，**默认值为1**

### 要点
1. `Array.prototype.flat()`用于数组降维，该方法执行后返回一个新数组，此方法不改变原数组。
2. 传入的参数`deep`代表拉平数组的层数
- 不传参时，默认拉平`1`层
- `deep <=0 `返回原数组
- `deep === Infinity`时，无论数组有多少层，都被转换为1维数组
3. 此方法会跳过数组中未被初始化的元素 
### 实现
#### | for + 递归
```js
Array.prototype._flat = function (deep = 1) {
    const arr = this;
    if (deep <= 0) return arr.slice();

    const result = [];

    function fn(array, deep) {
        for (let i = 0; i < array.length; i++) {
            // 跳过数组中未被初始化的元素
            if (i in array) {
                Array.isArray(array[i]) && deep > 0 ? fn(array[i], deep - 1) : result.push(array[i]);
            }
        }
    }

    fn(arr, deep);
    return result;
}

```
#### | reduce + 递归
```js
Array.prototype._flat = function (deep = 1) {
    const arr = this;
    if (deep <= 0) return arr.slice();

    return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) && deep >= 0 ? cur._flat(deep - 1) : cur), [])
}

```

```js
// 测试
var arr1 = [1, 2, [3, 4]];
console.log(arr1._flat());
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
console.log(arr2._flat());
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2,,,,,, [3, 4, [5, 6]]];
console.log(arr3._flat(2));
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(arr4._flat(Infinity));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
