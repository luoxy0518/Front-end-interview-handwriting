## Object.assign
### 概述
`Object.assign()`方法用于将所有 **可枚举属性的值** 从一个或多个源对象分配到目标对象。它将返回目标对象。

### 参数
- `target` 目标对象
- `source1` 源对象
- .
- .
- .
- `sourceN` 源对象N

### 要点
1. `Object.assign()`只会拷贝 **自身的可枚举** 属性的值，并且是浅拷贝。
2. 如果目标对象是`null/undefined`会报错，因为`null/undefined`没有包装类，无法将其转换为对象。
3. 原始类型会被转换为其包装类，注：只有字符串的包装对象才可能有自身可枚举属性。。
```js
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo")

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```   
4. 如果在合并时有相同的键，后面的值会覆盖前面的值。

### 实现
```js
Object.defineProperty(Object.prototype, '_assign', {
    // 可写
    writable: true,
    // 可配置
    configurable: true,
    // 不可枚举，默认 enumerable:false
    value: function (target, ...sources) {
        // 1. 目标对象为undefined或null时，报错
        if (!target) throw new TypeError('cannot convert ' + target + ' to object !');

        // 2.将目标对象转换为其对应包装类
        target = Object(target);

        // 3.循环源对象
        for (let i = 0; i < sources.length; i++) {
            const source = sources[i];
            // 4.浅拷贝源对象 到 目标对象
            for (let key in source) {
                if (source.hasOwnProperty(key)) target[key] = source[key];
            }
        }
        // 5.返回目标对象
        return target;
    }
})

// 测试
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo")

const obj = Object._assign(null, v1, null, v2, undefined, v3, v4);
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj,'---'); // { "0": "a", "1": "b", "2": "c" }
```
