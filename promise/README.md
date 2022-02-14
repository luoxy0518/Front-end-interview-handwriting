## 实现Promise

### 实现 new Promise 及 Promise.prototype.then()

```js
// 定义三种状态
const PROMISE_PENDING = 'pending';
const PROMISE_FULFILLED = 'fulfilled';
const PROMISE_REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        this.status = PROMISE_PENDING;
        this.value = undefined;
        this.reason = undefined;

        // 成功、失败 事件的回调队列
        this.onFulfilledFns = [];
        this.onRejectedFns = [];

        const resolve = (value) => {
            if (this.status === PROMISE_PENDING) {
                this.status = PROMISE_FULFILLED;
                this.value = value;

                // window对象提供的微任务方法
                queueMicrotask(() => {
                    this.onFulfilledFns.forEach((fn) => fn(this.value));
                })
            }
        }

        const reject = (reason) => {
            if (this.status === PROMISE_PENDING) {
                this.status = PROMISE_REJECTED;
                this.reason = reason;

                queueMicrotask(() => {
                    this.onRejectedFns.forEach((fn) => fn(this.reason));
                })

            }
        }

        // 执行同步代码
        try {
            // 传递参数，并绑定this指向
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    // 1. then方法最多接收两个参数，两个参数都是可选的
    // 2. 当参数不为function类型时，忽略其值，实现透传
    // 3. then要返回一个新的promise
    // 4. then不能返回同一个promise
    // 5. onRejected/onFulfilled 的返回值，会成为then返回新promise的resolve值
    //    1) 返回普通值，直接作为新promise的resolve值
    //    2) 返回 Promise实例或者thenable 类型，新的promise状态为 返回值（Promise/thenable）状态
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled !== 'function' ? (value) => value : onFulfilled;
        onRejected = typeof onRejected !== 'function' ? err => {
            throw Error(err)
        } : onRejected;

        function _parseResult(value, fn, resolve, reject) {
            try {
                let result = fn(value);
                if (result && (result instanceof MyPromise || typeof result.then === 'function')) {
                    result.then(resolve, reject)
                } else {
                    // onFulfilled和onRejected返回值，都相当于 resolve(value)
                    resolve(result);
                }
            } catch (err) {
                reject(err);
            }
        }

        // then方法返回一个新的Promise实例，实现链式调用
        return new MyPromise((resolve, reject) => {
            // 当promise状态未确定时，将事件放入回调队列中保存
            if (this.status === PROMISE_PENDING) {
                this.onFulfilledFns.push((value) => {
                    _parseResult(value, onFulfilled, resolve, reject);
                });

                this.onRejectedFns.push((reason) => {
                    _parseResult(reason, onRejected, resolve, reject);
                });
            }

            if (this.status === PROMISE_FULFILLED) {
                queueMicrotask(() => _parseResult(this.value, onFulfilled, resolve, reject));
            }

            if (this.status === PROMISE_REJECTED) {
                queueMicrotask(() => _parseResult(this.reason, onRejected, resolve, reject));
            }
        })
    }
}
```

### 实现Promise.prototype.catch()

```js
Promise.prototype.catch = function (fn) {
    return this.then(undefined, fn);
}

```

### 实现Promise.prototype.finally()

```js
Promise.prototype.finally = function (fn) {
    return this.then((value) => {
        fn();
        return value;
    }, (reason) => {
        fn();
        return reason;
    })
}
```

### 实现Promise.resolve()

```js
Promise.resolve = function (value) {
    return new Promise((resolve) => {
        if (value && (value instanceof Promise || typeof value.then === 'function')) {
            value.then(resolve);
        } else {
            resolve(value);
        }
    });
}
```
### 实现Promise.reject()
```js
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        if (reason && (reason instanceof Promise || typeof reason.then === 'function')) {
            reason.then(resolve, reject);
        } else {
            reject(reason);
        }
    })
}
```

### 实现Promise.all()

```js
// 1. 接收一个可可迭代对象（具有[Symbol.iterator]接口的对象）
// 2. 迭代每一个元素
//    1) Promise类型，
//    2) 非Promise类型，需要用Promise.resolve()方法包装
// 3. 成功时按照原有数组顺序返回结果
// 4. 有一个promise的状态为reject，则整体状态为rejected，其值为第一个失败的值
Promise.all = function (promises) {
    if (!promises || typeof promises !== 'object' || typeof promises[Symbol.iterator] !== 'function') throw TypeError(promises + 'is not iterator');
    return new Promise((resolve, reject) => {
        const length = promises.length;
        let count = 0;

        if (length === 0) resolve([]);

        const result = new Array(length);
        for (let i = 0; i < length; i++) {
            let p = promises[i];
            if (!(p instanceof Promise)) p = Promise.resolve(p);

            p.then((value) => {
                result[i] = value;
                count++;
                if (count === length) resolve(result);
            }, (err) => reject(err))
        }
    })
}
```

### 实现Promise.allSettled()

```js
// 1. 接收一个可可迭代对象（具有[Symbol.iterator]接口的对象）
// 2. 迭代每一个元素
//    1) Promise类型，
//    2) 非Promise类型，需要用Promise.resolve()方法包装
// 3. 结果会被包装为 {status: fulfilled/rejected, value/reason}
Promise.allSettled = function (promises) {
    if (!promises || typeof promises !== 'object' || typeof promises[Symbol.iterator] !== 'function') throw TypeError(promises + 'is not iterator');
    return new Promise((resolve, reject) => {
        const length = promises.length;
        let count = 0;

        if (length === 0) resolve([]);

        const result = new Array(length);
        for (let i = 0; i < length; i++) {
            let p = promises[i];
            if (!(p instanceof Promise)) p = Promise.resolve(p);

            p.then((value) => {
                result[i] = {status: 'fulfilled', value};
                count++;
                if (count === length) resolve(result);
            }, (reason) => {
                result[i] = {status: 'rejected', reason};
                if (count === length) resolve(result);
            })
        }
    })
}
```

### 实现Promise.race()

```js
// 1. 接收一个可可迭代对象（具有[Symbol.iterator]接口的对象）
// 2. 迭代每一个元素
//    1) Promise类型，
//    2) 非Promise类型，需要用Promise.resolve()方法包装
// 3. 最快返回的promise值会作为Promise.race的值
Promise.race = function (promises) {
    if (!promises || typeof promises !== 'object' || typeof promises[Symbol.iterator] !== 'function') throw TypeError(promises + 'is not iterator');
    return new Promise((resolve, reject) => {
        const length = promises.length;
        if (length === 0) resolve([]);

        const result = new Array(length);
        for (let i = 0; i < length; i++) {
            let p = promises[i];
            if (!(p instanceof Promise)) p = Promise.resolve(p);

            p.then(resolve, reject)
        }
    })
}
```

### 实现Promise.any()

```js
// 1. 接收一个可可迭代对象（具有[Symbol.iterator]接口的对象）
// 2. 迭代每一个元素
//    1) Promise类型，
//    2) 非Promise类型，需要用Promise.resolve()方法包装
// 3. 返回值：
//          1） 最快返回的成功promise值会作为Promise.any值
//          2） 传入一个空的可迭代对象（例：[]）,则返回一个失败状态
//          3） 当所有可迭代都为promise拒绝状态，返回一个失败状态
Promise.any = function (promises) {
    if (!promises || typeof promises !== 'object' || typeof promises[Symbol.iterator] !== 'function') throw TypeError(promises + 'is not iterator');
    return new Promise((resolve, reject) => {
        const length = promises.length;
        if (length === 0) reject([]);

        const rejectedResult = new Array(length);
        let count = 0;

        for (let i = 0; i < length; i++) {
            let p = promises[i];
            if (!(p instanceof Promise)) p = Promise.resolve(p);

            p.then(resolve, (err) => {
                rejectedResult[i] = err;
                count++;
                if (count === length) reject(rejectedResult);
            })
        }
    })
}
```


