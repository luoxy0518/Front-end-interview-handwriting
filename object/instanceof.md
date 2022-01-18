## instanceof 运算符
### 概述
`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

### 要点
- 不断循环实例的隐式原型，判断其是否等于构造函数的显式原型。

### 实现
```js
function myInstanceof(left, right){
    left = Object.getPrototypeOf(left);     // Object.getPrototypeOf(o1) === o1.__proto__
    right = right.prototype;

    while (left){
       if(left === right) return true;

       left = Object.getPrototypeOf(left);
    }

    return false;
}


// 测试
const a = []
const b = {}

function Foo(){}
const c = new Foo()

function child(){}
function father(){}

child.prototype = new father()
const d = new child()

console.log(myInstanceof(a, Array))     // true
console.log(myInstanceof(b, Object))    // true
console.log(myInstanceof(b, Array))     // false
console.log(myInstanceof(a, Object))    // true
console.log(myInstanceof(c, Foo))       // true
console.log(myInstanceof(d, child))     // true
console.log(myInstanceof(d, father))    // true

```
