// function myInstanceof(left, right){
//     left = Object.getPrototypeOf(left);     // Object.getPrototypeOf(o1) === o1.__proto__
//     right = right.prototype;
//
//     while (left){
//        if(left === right) return true;
//
//        left = Object.getPrototypeOf(left);
//     }
//
//     return false;
// }
//
//
// // 测试
// const a = []
// const b = {}
//
// function Foo(){}
// const c = new Foo()
//
// function child(){}
// function father(){}
//
// child.prototype = new father()
// const d = new child()
//
// console.log(myInstanceof(a, Array))     // true
// console.log(myInstanceof(b, Object))    // true
// console.log(myInstanceof(b, Array))     // false
// console.log(myInstanceof(a, Object))    // true
// console.log(myInstanceof(c, Foo))       // true
// console.log(myInstanceof(d, child))     // true
// console.log(myInstanceof(d, father))    // true

//
// function myNew(fn,...args){
//     // 1.创建一个空对象
//     const context = {};
//     // 2.空对象的__proto__值，为其构造函数的原型对象
//     Object.setPrototypeOf(context, fn.prototype);   //  context.__proto__ = fn.prototype;
//
//     // 3.this指向这个空对象
//     const res = fn.apply(context, args);
//
//     // 4.如果函数的返回值 为 对象，则返回对象；返回值不为对象，则返回this
//     if(res !== null && typeof res === 'object') return res;
//     return context;
// }
//
//
// function Fn(name, age){
//     this.name = name;
//     this.age = age;
//     return null;
// }
//
// const n = new Fn('nnn', 'mmmm');
// console.log(n);
// const m = myNew(Fn, '0000', 2222);
// console.log(m);

//
// Object._is = function (x, y) {
//     if (x === y) {
//         if (x !== 0) return true;
//         // 判断 +0 === -0
//         return 1 / x === 1 / y;
//     } else {
//         // 判断NaN === NaN
//         return x !== x && y !== y;
//     }
// }
//
// console.log(`__is('foo', 'foo'): ${Object._is('foo', 'foo')}`); // true
//
// const __foo = { a: 1 };
// const __bar = { a: 1 };
// console.log(`__is(__foo, __foo): ${Object._is(__foo, __foo)}`); // true
// console.log(`__is(__foo, __bar): ${Object._is(__foo, __bar)}`); // false
// console.log(`__is([], []): ${Object._is([], [])}`); // false
// console.log(`__is(null, null): ${Object._is(null, null)}`); // true
//
// // 特例 +0 -0 | NaN NaN
// console.log(`__is(0, -0): ${Object._is(0, -0)}`); // false
// console.log(`__is(0, +0): ${Object._is(0, +0)}`); // true
// console.log(`__is(-0, -0): ${Object._is(-0, -0)}`); // true
// console.log(`__is(NaN, NaN): ${Object._is(NaN, NaN)}`); // true
//
// Object.defineProperty(Object.prototype, '_assign', {
//     // 可写
//     writable: true,
//     // 可配置
//     configurable: true,
//     // 不可枚举，默认 enumerable:false
//     value: function (target, ...sources) {
//         // 1. 目标对象为undefined或null时，报错
//         if (!target) throw new TypeError('cannot convert ' + target + ' to object !');
//
//         // 2.将目标对象转换为其对应包装类
//         target = Object(target);
//
//         // 3.循环源对象
//         for (let i = 0; i < sources.length; i++) {
//             const source = sources[i];
//             // 4.浅拷贝源对象 到 目标对象
//             for (let key in source) {
//                 if (source.hasOwnProperty(key)) target[key] = source[key];
//             }
//         }
//         // 5.返回目标对象
//         return target;
//     }
// })
//
// // 测试
// const v1 = "abc";
// const v2 = true;
// const v3 = 10;
// const v4 = Symbol("foo")
//
// const obj = Object._assign(null, v1, null, v2, undefined, v3, v4);
// // 原始类型会被包装，null 和 undefined 会被忽略。
// // 注意，只有字符串的包装对象才可能有自身可枚举属性。
// console.log(obj,'---'); // { "0": "a", "1": "b", "2": "c" }


// Object._create = function(proto){
//     if(typeof proto !== 'object' && typeof proto !== 'function') throw new TypeError();
//
//     function F(){}
//     F.prototype = proto;
//
//     return new F();
// }

// Array._isArray = function(arg){
//     return Object.prototype.toString.call(arg) === '[object Array]'
// }
//
// Array.prototype._flat = function (deep = 1) {
//     const arr = this;
//     if (deep <= 0) return arr.slice();
//
//     const result = [];
//
//     function fn(array, deep) {
//         for (let i = 0; i < array.length; i++) {
//             if (i in array) {
//                 Array.isArray(array[i]) && deep > 0 ? fn(array[i], deep - 1) : result.push(array[i]);
//             }
//         }
//     }
//
//     fn(arr, deep);
//     return result;
// }
//
// Array.prototype._flat = function (deep = 1) {
//     const arr = this;
//     if (deep <= 0) return arr.slice();
//
//     return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) && deep >= 0 ? cur._flat(deep - 1) : cur), [])
// }
//
// var arr1 = [1, 2, [3, 4]];
// console.log(arr1._flat());
// // [1, 2, 3, 4]
//
// var arr2 = [1, 2, [3, 4, [5, 6]]];
// console.log(arr2._flat());
// // [1, 2, 3, 4, [5, 6]]
//
// var arr3 = [1, 2,,,,,, [3, 4, [5, 6]]];
// console.log(arr3._flat(2));
// // [1, 2, 3, 4, 5, 6]
//
// //使用 Infinity，可展开任意深度的嵌套数组
// var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
// console.log(arr4._flat(Infinity));
// // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 定义生成器函数，入参是任意集合
function iteratorGenerator(list) {
    // idx记录当前访问的索引
    var idx = 0
    // len记录传入集合的长度
    var len = list.length
    return {
        // 自定义next方法
        next: function() {
            // 如果索引还没有超出集合长度，done为false
            var done = idx >= len
            // 如果done为false，则可以继续取值
            var value = !done ? list[idx++] : undefined

            // 将当前值与遍历是否完毕（done）返回
            return {
                done: done,
                value: value
            }
        }
    }
}

var iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
iterator.next()
iterator.next()
iterator.next()
