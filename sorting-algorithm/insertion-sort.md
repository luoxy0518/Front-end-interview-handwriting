## 插入算法
### 比较步骤
1. **从第一个元素开始，该元素可以认为已经被排序；**
2. 取出下一个元素，在已经排序的元素序列中从后向前扫描；
3. 如果该元素（已排序）大于新元素，将该元素移到下一位置(交换位置)；
4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
5. 将新元素插入到该位置后；
6. 重复步骤2~5。
### 编程思想
扑克牌思想： 就像自己在打扑克牌，接起来一张，放哪里无所谓，再接起来一张，比第一张小，放左边，继续接，可能是中间数，就插在中间....依次类推
### 实现
```js
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        // 注意 j 的 边界条件不能等于0，因为从要考虑到会取[j - 1]，所以 j 最小值为1
        for (let j = i; j > 0; j--) {
            const prev = arr[j - 1];
            const cur = arr[j];

            if (prev > cur) {
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            }else{
                break;
            }
        }
    }

    return arr;
}

console.log(insertSort([1, 2, 3111, 0, 32, 21,0]));
```

#### 推荐阅读
- [十大经典排序算法（动图演示）](https://www.cnblogs.com/onepixel/p/7674659.html)
- [排序算法](https://zxpsuper.github.io/Demo/advanced_front_end/suanfa/sort.html#_1-%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)
