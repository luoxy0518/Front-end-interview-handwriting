## 选择排序
### 比较步骤
1. 从数组的开头开始，将第一个元素和其他元素作比较，检查完所有的元素后，最小 (大) 的放在第一个位置
2. 取第二个元素重复以上一直到最后。
### 编程思路
两个循环，外循环不断递增至结尾，内循环负责找出每次循环最小的值给外层循环交换位置。

### 实现
```js
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minVal = arr[i],
            minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < minVal) {
                minVal = arr[j];
                minIndex = j;
            }
        }
        // 每次循环后，交换位置
        if (i !== minIndex) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr;
}

console.log(selectionSort([1, 2, 3111, 0, 32, 21]));
```

#### 推荐阅读
- [十大经典排序算法（动图演示）](https://www.cnblogs.com/onepixel/p/7674659.html)
- [排序算法](https://zxpsuper.github.io/Demo/advanced_front_end/suanfa/sort.html#_1-%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)
