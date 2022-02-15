## 回调函数
### 概述
函数作为参数，即可称之为回调函数。

```js
function add(num1, num2, callback) {
  const sum = num1 + num2;

  // 数值相加后，将相加和作为参数传入回调函数
  callback(sum);
}


add(1, 2, function(val){
    console.log(val);
});
```

### 回调函数特点
- 不会立即执行
- 回调函数是一个闭包。他可以访问到其外层定义的变量
- 注意`this`的指向

### 优点
- 可以将通用的逻辑抽象
- 加强代码可维护性
- 加强代码可读性
- 分离专职的函数

### 使用场景
- 异步编程
- 事件监听、处理
- `setTimeout`、`setInterval` 方法
