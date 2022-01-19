## Object.create

### 概述
`Object.create() `方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。

### 参数
- `proto` 新创建对象的原型对象
- `propertiesObject` 可选，额外添加到新对象的 **自有可枚举属性** ，其属性类型参照`Object.defineProperties()`的第二个参数

### 要点
1. 第一个参数只能为`null/function/object`，否则会抛出错误。
2. 返回的新对象的隐式原型指向参数一

### 实现
```js
// 简单实现，至于为什么不写第二个参数我也不知道，MDN就是这样写的🤣
Object._create = function(proto){
    if(typeof proto !== 'object' && typeof proto !== 'function') throw new TypeError();

    function F(){}
    F.prototype = proto;
    
    return new F();
}
```
