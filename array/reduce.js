/**
 * 概述：reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
 *
 * 参数：
 * - callback
 *   - acc
 *   - currentValue
 *   - index
 *   - arr
 * - thisArgs
 *
 * 要点：
 * 1.跳过数组中未被初始化的元素（empty），不执行回调函数
 * 2.当数组为空 并且 无初始值时，报错
 * 3.当有初始值时acc = initVal
 * 4.当无初始值时acc = arr[0]
 */
Array.prototype._reduce = function (callback, initValue) {
    if (!this) throw new TypeError('this is null or undefined!');
    if (typeof callback !== 'function') throw TypeError(callback + 'is not a function!');

    // 当数组为空数组时 并且 没有初始值时 报错
    if (!this.length && !initValue) throw new TypeError('Reduce of empty array with no initial value');

    const arr = this,
        len = arr.length;
    let acc = initValue,
        index = 0;

    // 当没有传递初始值时
    if (arguments.length !== 2) {
        // 数组中找出第一个不为empty的元素作为初始值
        while (index < len && index in arr) {
            index++;
        }
        // 当index === len时证明数组中所有元素都未被初始化
        if (index === len) throw new TypeError('Reduce of empty array with no initial value');
        // 将值 赋值给 初始值
        acc = arr[index];
        // index + 1
        index++;
    }

    for (index; index < len; index++) {
        // 对未初始化的元素empty不执行回调（未被初始化的元素下标 index in arr === false）
        if (!(index in arr)) continue;

        acc = callback(acc, arr[index], index, arr);
    }

    return acc;
}

const sum = [, , , , 1, 10]._reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
}, 0)

console.log(sum) // logs 6
