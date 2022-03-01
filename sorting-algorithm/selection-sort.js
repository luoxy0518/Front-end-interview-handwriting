/**
 * 选择排序
 *
 * 从数组的开头开始，将第一个元素和其他元素作比较，检查完所有的元素后，最小 (大) 的放在第一个位置，接下来再开始从第二个元素开始，重复以上一直到最后。
 * 编程思路：两个循环，外循环不断递增至结尾，内循环负责找出每次循环最小的值给外层循环交换位置
 */
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

