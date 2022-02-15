## 惰性函数
### 概述
惰性函数，指**函数中的 判断分支只在第一次调用时执行**，在第一次执行过程中，**函数本身会被分支中的另一个函数所覆盖**，这样再次执行函数时不会执行判断部分的代码，提高性能。

> 其本质就是js变量名的重新赋值。
### 应用场景
#### | DOM绑定事件兼容性处理
在不同的浏览器上对`DOM`进行事件绑定时，需要进行兼容性处理。以下代码**只会在第一次执行时，判断`if`分支**，之后函数被重写。
```js
function addEvent(dom, type, fn) {
    let event;
    if (dom.addEventListener) {
        // IE9及以上支持
        event = (dom, type, fn) => dom.addEventListener(type, fn);
    } else if (dom.attachEvent) {
        // IE8及以下支持
        event = (dom, type, fn) => dom.attachEvent('on' + type, fn);
    } else {
        // 全支持
        event = (dom, type, fn) => dom['on' + type] = fn;
    }

    return event(dom, type, fn);
}
```

> 但是以上的写法也存在缺点，当函数名被更改时，需要更改很多处名字（`event`）。改进为：声明函数时指定适当的函数

**所以我们把嗅探浏览器的操作提前到代码加载的时候，在代码加载的时候就立刻进行一次判断，以便让 `addEvent` 返回一个包裹了正确逻辑的函数。**

```js
// 在代码加载时就进行判断
const addEvent = (function () {
  if (document.addEventListener) {
    return function (type, element, func) {
      element.addEventListener(type, func, false);
    }
  }
  else if (document.attachEvent) {
    return function (type, element, func) {
      element.attachEvent('on' + type, func);
    }
  }
  else {
    return function (type, element, func) {
      element['on' + type] = func;
    }
  }
})();
```
