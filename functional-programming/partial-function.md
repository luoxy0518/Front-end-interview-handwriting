## 偏函数
### 概述
偏函数是**固定一个函数的一个或多个参数**，将一个 `n` 元函数转换成一个 `n - x` 元函数。

### 偏函数的实际应用
#### | Function.prototype.bind
`bind` 函数可以让我们传入一个或多个预设的参数，之后返回一个新函数，并拥有指定的 `this` 值和预设参数。

当绑定函数被调用时，预设参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数跟在它们后面。
```js
function addition(x, y) {
  return x + y;
}
const plus5 = addition.bind(null, 5);

plus5(10); // 15
plus5(25); // 30
```
### 实现
#### | 基础版本
```js
function partial(fn, ...args){
    return function(...otherArgs){
        return fn.apply(this, [...args,...otherArgs]);
    }
}

// -------- 测试 ------------
function addition(x, y) {
    return x + y;
}
const plus5 = partial(addition, 1)

plus5(10); // 11
plus5(25); // 26
```
#### | 进阶版本
要求，提供 _ 作为占位符，可以不按照顺序传入参数。
```js
// 将占位符定义为 对象，防止其他值被误认为占位符
const _ = {};
function partialPlus(fn, ...args){
    return function(...otherArgs){
        let index = 0;
        const len = args.length;
        
        // 遇到占位符，则按照顺序取第二次函数执行时的参数
        for(let i = 0; i < len; i++){
            args[i] = (args[i] === _ ? otherArgs[index++] : args[i]);
        }
        // 在补上占位符后，若第二次的函数还有剩余，拼接到参数中
        while(index < otherArgs.length) {
            args.push(otherArgs[index++]);
        }
        
        // 调用函数并返回结果
        return fn.apply(this, args);
    }
}

// ------------- 测试 -------------------
const fn = partialPlus(function(a, b, c) {
    console.log([a, b, c]);
},"a", _, "c");

fn("b") // ["a", "b", "c"]
```
