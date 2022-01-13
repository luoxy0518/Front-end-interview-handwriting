/**
 * 概述： map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
 * 参数：
 * - callback
 *   - currentValue
 *   - index
 *   - arr
 * - thisArgs
 *
 * 要点：
 * 1.跳过数组中未被初始化的元素（empty），不执行回调函数
 * 2.有返回值，返回值是一个新数组
 */
Array.prototype._map = function(callback, thisArg){
    if(!this) throw new TypeError('');
    if(typeof callback !== 'function') throw new TypeError(callback + 'is not a function!');

    const arr = this,
          len = arr.length,
          result = new Array(len);

    for(let i = 0; i < len; i++){
        // 对未初始化的元素empty不执行回调（未被初始化的元素下标 index in arr === false）
        if(i in arr){
            // 按照下标放入结果中，不可以用push，因为要保留未被初始化的值
            result[i] = callback.call(thisArg, arr[i], i, arr);
        }
    }

    return result;
}

// 测试
const a  = [1,2,3,4,,]._map((item) => item * 2);
console.log(a);
// [2, 4, 6, 8, empty ]
