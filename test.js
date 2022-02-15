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
// function iteratorGenerator(list) {
//     // idx记录当前访问的索引
//     var idx = 0
//     // len记录传入集合的长度
//     var len = list.length
//     return {
//         // 自定义next方法
//         next: function() {
//             // 如果索引还没有超出集合长度，done为false
//             var done = idx >= len
//             // 如果done为false，则可以继续取值
//             var value = !done ? list[idx++] : undefined
//
//             // 将当前值与遍历是否完毕（done）返回
//             return {
//                 done: done,
//                 value: value
//             }
//         }
//     }
// }
//
// var iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
// iterator.next()
// iterator.next()
// iterator.next()


//
// function curry(fn){
//     const fnArgLength = fn.length;
//     let args = [];
//
//     return function buffer(...args2){
//         args = [...args, ...args2];
//
//         if(args.length >= fnArgLength){
//             return fn.apply(this, args);
//         }else{
//             return buffer;
//         }
//     }
// }
//
// const sum = (a, b, c, d) => a + b + c + d;
// const sum1 = curry(sum);
// const sum2 = curry(sum);
//
// console.log(sum1(1)(2)(3)(4));  // 10 标准函数柯里化（函数接收单一参数）
// console.log(sum2(1,2)(3)(4));   // 10
// console.log(sum2(1,2,3,4));   // 10

//
// function curry(fn){
//     let args = [];
//     return function buffer(...args2){
//         args = [...args, ... args2];
//
//         if(args2.length === 0) {
//             return fn.apply(this, args);
//         }else{
//             return buffer;
//         }
//     }
// }
//
// function sum (a, b, c){
//     return a+b+c;
// }
// const sum1 = curry(sum);
//
// // console.log(sum1(1)(2)(3)());
// /**
//  * 执行结果
//  *  0
//  *  1
//  *  4
//  *  2
//  *  3
//  *  5
//  *  6
//  *
//  * 宏任务
//  *
//  *
//  *
//  * 微任务 p1
//  *       p3
//  *       p2
//  *
//  *
//  *
//  */
//
// // p1
// Promise.resolve().then(() => {
//     console.log(0);
//     // p2
//      Promise.resolve(4);
// }).then((res) => {
//     console.log(4)
// })
//
// // p3
// Promise.resolve().then(() => {
//     console.log(1);
//     // p4
// }).then(() => {
//     console.log(2);
//     // p5
// }).then(() => {
//     console.log(3);
//     // p6
// }).then(() => {
//     console.log(5);
//     // p7
// }).then(() =>{
//     console.log(6);
// })


// Promise.resolve().then(() => {
//     console.log(1);
// }).then(res => {
//     console.log(2)
// })


// const p = new Promise((resolve, reject) => {
//     resolve(1)
// })
//
// p.then(() => {
//     return 1
// }).catch((err) => {
//     console.log(err, 'err')
// }).then(() => {
//     console.log(1);
//     return new Promise((resolve, reject) => {
//         reject('111')
//     })
// }).catch(() => {
//
// })

//
// // 发布订阅
// class EventEmitter {
//     constructor() {
//         // 事件管理器
//         this.events = {};
//     }
//
//     // 订阅事件
//     on(type, listener) {
//         if (this.events[type]) {
//             this.events[type].push(listener);
//         } else {
//             this.events[type] = [listener];
//         }
//     }
//
//     // 只执行一次的事件，发布后需要将其删掉
//     once(type, listener) {
//         // 利用闭包
//         const once = () => {
//             listener();
//             // 事件执行后，移除
//             this.removeListener(type, once);
//         }
//
//         this.on(type, once);
//     }
//
//     // 发布/触发事件
//     emit(type) {
//         if (!this.events[type]) return;
//
//         this.events[type].forEach(fn => fn());
//     }
//
//     // 移除订阅事件
//     removeListener(type, listener) {
//         if (!this.events[type]) return;
//
//         this.events[type] = this.events[type].filter(fn => fn !== listener);
//     }
// }
//
// // 测试
// let em = new EventEmitter();
// let workday = 0;
// em.on("work", function() {
//     workday++;
//     console.log("work everyday");
// });
//
// em.once("love", function() {
//     console.log("just love you");
// });
//
// function makeMoney() {
//     console.log("make one million money");
// }
// em.on("money",makeMoney);
//
// let time = setInterval(() => {
//     em.emit("work");
//     em.removeListener("money",makeMoney);
//     em.emit("money");
//     em.emit("love");
//     if (workday === 5) {
//         console.log("have a rest")
//         clearInterval(time);
//     }
// }, 1);


//  function Foo(a, b) {
//     this.name = a;
//     this.age = b;
// }
//
// const f1 = Reflect.construct(Foo, ['lily', 18], function(){this.n = 1});
// console.log(f1, ' f1');
//
//
// const obj1 = new Proxy([], {
//     get(target, key){
//         return target[key];
//     },
//     set(target, key, val){
//         target[key] = val;
//         console.log(11);
//         return true;
//     }
// })
// obj1.push(2);


// /**
//  * 实现Vue3.0 响应式
//  */
// // --------------- util ---------------------
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
//
// // --------------- 将数据变为响应式 ----------------
// // 防止对象重复被代理
// const toProxy = new WeakMap;        // {target: proxyTarget}
// const toRow = new WeakMap;          // {proxyTarget: target}
//
// function reactiveObj(target) {
//     if (!isObject(target)) return target;
//
//     // 防止同一对象被代理多次
//     if (toProxy.has(target)) return toProxy.get(target);
//     // 已经被代理过的对象，直接返回代理对象，防止再次重复被代理
//     if (toRow.has(target)) return target;
//
//     const proxyTarget = new Proxy(target, {
//         get(target, key, receiver) {
//             const dep = track(target, key);
//             dep.addDepend();
//
//             const val = Reflect.get(target, key, receiver)
//             // 如果取值为对象，则需要递归将其变为响应式对象
//             return isObject(val) ? reactiveObj(val) : val;
//         },
//         set(target, key, newVal, receive) {
//             const oldVal = Reflect.get(target, key);
//             const result = Reflect.set(target, key, newVal, receive);
//
//             // 赋值，执行发布操作，执行其所有依赖函数
//             const dep = track(target, key);
//             dep.notify();
//
//             return result;
//         }
//     });
//     toProxy.set(target, proxyTarget);
//     toRow.set(proxyTarget, target);
//
//     return proxyTarget;
// }
//
// // --------------- 将函数变为响应式 -------------------
//
// // 当前正在执行的函数，方便在其他地方取到
// let activeFn = null;
//
// /**
//  *  1. 函数首先会被执行一次
//  *  2. 首次执行时, 会触发响应式对象的get操作，进行依赖的收集
//  *  3. 执行后需将activeFn重置
//  *
//  */
// function effect(fn) {
//     try {
//         activeFn = fn;
//         fn();
//     } finally {
//         // 确保当函数执行出错时，也会重置activeFn
//         activeFn = null;
//     }
// }
//
// // -------------- key -> fn 依赖收集器 --------------------
// class Depend {
//     constructor() {
//         this.reactiveFns = new Set;
//     }
//
//     // 订阅
//     addDepend() {
//         // 把当前执行的函数放入依赖队列中
//         activeFn && this.reactiveFns.add(activeFn);
//     }
//
//     // 发布
//     notify() {
//         this.reactiveFns.forEach(fn => fn());
//     }
// }
//
// // -------------- 拦截 Proxy get捕获器，收集依赖操作 --------------
// // 总的依赖池 其内部构造为 {obj: {key: new Depend, key2: new Depend}, obj2:{key: new Depend, key2: new Depend}}
// const targetMap = new WeakMap;
//
// function track(target, key) {
//     // 没有则添加，有则返回
//     let obj = targetMap.get(target);
//     if (!obj) {
//         obj = new Map;
//         targetMap.set(target, obj);
//     }
//
//     let deps = obj.get(key);
//     if (!deps) {
//         deps = new Depend;
//         obj.set(key, deps);
//     }
//
//     // 返回当前key对应的Depend实例
//     return deps;
// }
//
// // 使用
// const p1 = reactiveObj({name: 'lily', age: 18, list: [1, 2, 3, 4], nums: [{sort: 'A'}, {sort: 'B'}]});
// function fn() {
//     console.log('p1.name:', p1.name);
//     console.log('p1.list:', p1.list);
//
//     const sorts = p1.nums.map(item => item.sort);
//     console.log('p1.sorts:', sorts);
// }
//
// effect(fn);
//
// setTimeout(() => {
//     // p1.name = 'new name';
//     console.log('-------- 改变数据 --------');
//     p1.nums.push({sort: 'M'})
//     p1.nums[0].sort = 'C';
// }, 1000 * 2)
//

//
// class Vue {
//     constructor(options) {
//         this.$options = options
//         this.$data = options.data
//
//         // 重写数组方法
//         let arrayPrototype = Array.prototype
//         const methods = ['pop', 'push', 'shift', 'unshift']
//         this.proto = Object.create(arrayPrototype)
//         methods.forEach(method => {
//             this.proto[method] = function() {
//                 arrayPrototype[method].call(this, ...arguments)
//             }
//         })
//
//         // 响应化
//         this.observe(this.$data)
//
//         // 测试代码
//         // new Watcher(this, 'test')
//         // this.test
//
//         // 创建编译器
//         // new Compile(options.el, this)
//
//         if (options.created) {
//             options.created.call(this)
//         }
//     }
//
//
//     // 递归遍历，使传递进来的对象响应化
//     observe(value) {
//         if (!value || typeof value !== 'object') {
//             return
//         }
//
//         if (Array.isArray(value)) {
//             Object.setPrototypeOf(value, this.proto)
//         }
//
//         Object.keys(value).forEach(key => {
//             // 对key做响应式处理
//             this.defineReactive(value, key, value[key])
//             this.proxyData(key)
//         })
//     }
//
//     // 在Vue根上定义属性代理data中的数据,这样就能通过 this 调用数据
//     proxyData(key) {
//         Object.defineProperty(this, key, {
//             get() {
//                 return this.$data[key]
//             },
//             set(newVal) {
//                 this.$data[key] = newVal
//             }
//         })
//     }
//
//     defineReactive(obj, key, val) {
//         // 递归响应，处理嵌套对象
//         this.observe(val)
//
//         // 创建Dep实例： Dep和key一对一对应
//         const dep = new Dep()
//
//         // 给obj定义属性
//         Object.defineProperty(obj, key, {
//             get() {
//                 // 将Dep.target指向的Watcher实例加入到Dep中, 这部分是收集依赖
//                 Dep.target && dep.addDep(Dep.target)
//                 console.log('get')
//                 return val
//             },
//
//             set(newVal) {
//                 if (newVal !== val) {
//                     val = newVal
//                     console.log('set')
//                     // console.log(`${key}属性更新了`)
//                     dep.notify() // 通知视图更新
//                 }
//             }
//         })
//     }
// }
//
// // Dep: 管理若干watcher实例，它和key一对一关系
// class Dep {
//     constructor() {
//         this.deps = []
//     }
//
//     addDep(watcher) {
//         this.deps.push(watcher)
//     }
//
//     notify() {
//         this.deps.forEach(watcher => watcher.update())
//     }
// }
//
// // 实现update函数可以更新
// class Watcher {
//     constructor(vm, key, cb) {
//         this.vm = vm
//         this.key = key
//         this.cb = cb
//
//         // 将当前实例指向Dep.target
//         Dep.target = this
//         this.vm[this.key]
//         Dep.target = null
//     }
//
//     update() {
//         console.log(`${this.key}属性更新了`)
//         this.cb.call(this.vm, this.vm[this.key])
//     }
// // }
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
//
// function observe(obj) {
//     Object.entries(obj).forEach(([k, v]) => {
//         reactiveObj(obj, k, v);
//     })
// }
//
// function reactiveObj(obj, key, value) {
//     // 子属性为对象，继续递归，进行响应式监听
//     if (isObject(value)) observe(value);
//
//     // 重新定义已有属性的getter/setter
//     Object.defineProperty(obj, key, {
//         set(newVal) {
//             const oldVal = obj[key];
//
//             if (oldVal !== newVal) {
//                 // 赋新值为对象时，进行深度监听
//                 if (isObject(newVal)) observe(newVal);
//
//                 obj[key] = newVal;
//                 // 当值发生改变时，触发通知机制，改变视图等
//                 // notify();
//             }
//         },
//         get() {
//             return obj[key];
//         }
//     })
// }
//
// // 数组原型链的变异方法
// const arrayProto = Array.prototype;
// // 数组和其原型上，加了一层，其内容是自定义重写后的方法
// const arrayMethods = Object.create(arrayProto);
// // 七种需要主动拦截的数组变异方法
// const methodsTopPatch = [
//     'pop',
//     'push',
//     'shift',
//     'unshift',
//     'splice',
//     'slice',
//     'sort'
// ];
//
// methodsTopPatch.forEach(methodName => {
//     const origin = arrayProto[methodName];
//
//     def(arrayMethods, methodName, function () {
//         const args = [...arguments];
//         const ob = this.__ob__;
//         const result = origin.apply(this, args);
//
//         // 获取到新增元素组成的数组
//         let inserted;
//         switch (methodName) {
//             case 'push':
//             case 'unshift':
//                 inserted = args;
//                 break;
//             case 'splice':
//                 inserted = args.splice(2);
//                 break;
//         }
//         // 如果存在新增数组，则需要将新增的数组变为响应式数组
//         if (inserted) ob.observeArray(inserted);
//
//         // 通知依赖进行更新
//         ob.dep.notify();
//
//         // 返回原数组方法执行后结果
//         return result;
//     });
//
// });
//
// /**
//  * 定义自己的数组方法，目的实现数据劫持
//  * @param obj
//  * @param key
//  * @param value
//  * @param enumerable
//  */
// function def(obj, key, value, enumerable) {
//     Object.defineProperty(obj, key, {
//         value,
//         enumerable: !!enumerable,
//         configurable: true,
//         writable: true,
//     })
// }
//
// /**
//  * 将数组变为响应式数组
//  * @param array
//  */
// Observer.prototype.observeArray = function(array){
//     for(let i = 0; i < array.length; i++){
//         observe(array[i]);
//     }
// }
//

//
// function partial(fn, ...args){
//     return function(...otherArgs){
//         return fn.apply(this, [...args,...otherArgs]);
//     }
// }
//
// // 将占位符定义为 对象，防止其他值被误认为占位符
// const _ = {};
// function partialPlus(fn, ...args){
//     return function(...otherArgs){
//         let index = 0;
//         const len = args.length;
//
//         // 遇到占位符，则按照顺序取第二次函数执行时的参数
//         for(let i = 0; i < len; i++){
//             args[i] = (args[i] === _ ? otherArgs[index++] : args[i]);
//         }
//         // 在补上占位符后，若第二次的函数还有剩余，拼接到参数中
//         while(index < otherArgs.length) {
//             args.push(otherArgs[index++]);
//         }
//
//         // 调用函数并返回结果
//         return fn.apply(this, args);
//     }
// }
//
//
// const fn = partialPlus(function(a, b, c) {
//     console.log([a, b, c]);
// },"a", _, "c");
//
// fn("b") // ["a", "b", "c"]


// function addEvent(dom, type, fn) {
//     if (dom.addEventListener) {
//         // IE9及以上支持
//         dom.addEventListener(type, fn);
//     } else if (dom.attachEvent) {
//         // IE8及以下支持
//         dom.attachEvent('on' + type, fn);
//     } else {
//         // 全支持
//         dom['on' + type] = fn;
//     }
// }


function memoize(f) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        console.log(key,cache);
        if (Reflect.has(cache, key)) return cache[key];

        return cache[key] = f.apply(this, args);
    }
}


function add(a, b) {
    return a + b;
}

// 假设 memoize 可以实现函数记忆
var memoizedAdd = memoize(add);
console.log(memoizedAdd);

console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd(1, 2)); // 相同的参数，第二次调用时，从缓存中取出数据，而非重新计算一次
