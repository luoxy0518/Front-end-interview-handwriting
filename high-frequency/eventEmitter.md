## 发布订阅模式
### 概述
发布-订阅模式，它用来定义一种一对多的依赖关系。当某个对象发生改变的时候，所有依赖于它的对象都将得到通知。
#### | 优点
- 对象的解耦
- 通常用于异步编程中，可以用来代替回调函数。例如当`AJAX`的状态变为成功或者失败，可以通知其订阅者，执行不同的事件。
#### | 缺点
- 发布订阅本身需要消耗内存，也许某些事件订阅后，可能永远不会发生，但是这个订阅者会永远留在内存中
- 发布订阅将对象关系完全解耦，当层级过深时，会造成程序难以追踪

### 实现
```js
class EventEmitter {
    constructor() {
        // 事件管理器
        this.events = {};
    }

    // 订阅事件
    on(type, listener) {
        if (this.events[type]) {
            this.events[type].push(listener);
        } else {
            this.events[type] = [listener];
        }
    }

    // 只执行一次的事件，发布后需要将其删掉
    once(type, listener) {
        // 利用闭包
        const once = () => {
            listener();
            // 事件执行后，移除
            this.removeListener(type, once);
        }

        this.on(type, once);
    }

    // 发布/触发事件
    emit(type) {
        if (!this.events[type]) return;

        this.events[type].forEach(fn => fn());
    }

    // 移除订阅事件
    removeListener(type, listener) {
        if (!this.events[type]) return;

        this.events[type] = this.events[type].filter(fn => fn !== listener);
    }
}

// 测试
let em = new EventEmitter();
let workday = 0;
function makeMoney() {
    console.log("make one million money");
}

em.on("work", function() {
    workday++;
    console.log("work everyday");
});
em.once("love", function() {
    console.log("just love you");
});
em.on("money",makeMoney);

let time = setInterval(() => {
    em.emit("work");
    em.removeListener("money",makeMoney);
    em.emit("money");
    em.emit("love");
    
    if (workday === 5) {
        console.log("have a rest")
        clearInterval(time);
    }
}, 1);
```
