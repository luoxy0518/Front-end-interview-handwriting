## Array.isArray
### 概述
`Array.isArray()` 用于确定传递的值是否是一个 `Array`。
### 实现
```js
Array._isArray = function(arg){
    return Object.prototype.toString.call(arg) === '[object Array]'
}
```
