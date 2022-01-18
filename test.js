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


function myNew(fn,...args){
    // 1.创建一个空对象
    const context = {};
    // 2.空对象的__proto__值，为其构造函数的原型对象
    Object.setPrototypeOf(context, fn.prototype);   //  context.__proto__ = fn.prototype;

    // 3.this指向这个空对象
    const res = fn.apply(context, args);

    // 4.如果函数的返回值 为 对象，则返回对象；返回值不为对象，则返回this
    if(res !== null && typeof res === 'object') return res;
    return context;
}


function Fn(name, age){
    this.name = name;
    this.age = age;
    return null;
}

const n = new Fn('nnn', 'mmmm');
console.log(n);
const m = myNew(Fn, '0000', 2222);
console.log(m);
