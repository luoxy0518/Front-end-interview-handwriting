/**
 * 概述： call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
 *
 * 参数：
 * - thisArg 运行函数时的this指向
 * - arg1
 * - .
 * - .
 * - .
 * - argN 多个参数
 *
 * 要点：
 * 1. 在非严格模式下
 *    - this为空，默认指向window
 *    - this为简单类型，指向其对应的包装类（ Object(thisArg) 为简单类型对应的包装类）
 * 2. 使用"调用对象中的方法，this指向对象"的思想
 *    - 将方法添加到对象中，调用方法并传参，调用完毕将方法删除
 */
Function.prototype._call = function (thisArg = window, ...args) {
    const fn = this,
        // 使用Symbol类型，将添加的key私有化
        uniqueKey = Symbol(Math.random());

    // 将简单类型转换为其包装类
    thisArg = Object(thisArg);
    // 添加方法到this上
    thisArg[uniqueKey] = fn;

    const result = thisArg[uniqueKey](...args);
    // 执行完毕后，将方法删除
    delete thisArg[uniqueKey];

    return result;
}


// 测试
function sum(c) {
    return this.a + this.b + c;
}

console.log(sum._call({a: 1, b:2}, 3));     // 6
