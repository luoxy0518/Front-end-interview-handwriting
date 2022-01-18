## new 运算符
### 概述
`new` 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
### new内部完成了什么事情（`MDN标准回答`）
1. 执行函数，创建空对象`{}`
2. 向空对象添加`__proto__`属性，其值指向构造函数的原型对象（`prototype`）
3. 将创建的对象作为`this`的上下文
4. **如果该函数没有返回对象，则默认返回`this`**

### 实现
```js

function myNew(fn,...args){
    // 1.创建一个空对象
    const context = {};
    // 2.空对象的__proto__值，为其构造函数的原型对象
    Object.setPrototypeOf(context, fn.prototype);   //  与 context.__proto__ = fn.prototype 相同，setPrototype的性能高

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
```

