## 函数柯里化（curry）
### 概述
柯里化（`curry`），又称部分求值。指：只传递给函数部分参数，其结果会返回新的函数去接受剩余的参数

### 柯里化优点
- 函数单一职责化
- 可以实现参数的复用，减少冗余代码
### 要点
柯里化主要思想是： 利用闭包的思想，将传递的实参存入数组中，待满足条件后执行函数。
#### | 类型一：函数参数固定
当实参列表与形参列表的长度相同时，执行函数。
#### | 类型二：函数参数不固定，不传参即为调用
函数参数是不固定的，当不传参，调用空参函数时，即为调用函数

### 实现
#### | 基础版本
```js
// 类型一：参数个数固定
function curry(fn){
    const fnArgLength = fn.length;
    let args = [];

    return function buffer(...args2){
        args = [...args, ...args2];

        if(args.length >= fnArgLength){
            return fn.apply(this, args);
        }else{
            return buffer;
        }
    }
}

const sum = (a, b, c, d) => a + b + c + d;
const sum1 = curry(sum);
const sum2 = curry(sum);

console.log(sum1(1)(2)(3)(4));  // 10 标准函数柯里化（函数接收单一参数）
console.log(sum2(1,2)(3)(4));   // 10
console.log(sum2(1,2,3,4));     // 10
```

```js
// 类型一：参数个数不固定
function curry(fn){
    let args = [];
    return function buffer(...args2){
        args = [...args, ... args2];

        if(args2.length === 0) {
            return fn.apply(this, args);
        }else{
            return buffer;
        }
    }
}

function sum (a, b, c){
    return a+b+c;
}
const sum1 = curry(sum);

console.log(sum1(1)(2)(3)());
```
#### | 进阶版本

