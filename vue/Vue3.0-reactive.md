## 实现Vue3.0响应式
`Vue3.0`中，尤大使用`ES6`的`Proxy`替代了`ES5`的`Object.defineProperty()`。`Proxy`提供了`13`种拦截方法，作为新标准将受到浏览器厂商重点持续的性能优化。
### Proxy相对于Object.defineProperty的优势
- `Proxy`可以监听数组`length`的变化，以及对象属性的添加和删除
- 不需要深度遍历监听：
  - `Object.defineProperty`需要深度遍历对象的每一层，将对象变为响应式。
  - `Proxy`只在 `getter` 被触发时，才对对象的下一层进行劫持(优化了性能)
所以，建议使用 `Proxy` 监测变量变化。
### 源码实现响应式
```js
/**
 * 实现Vue3.0 响应式
 */
// --------------- util ---------------------
function isObject(val) {
    return typeof val === 'object' && val !== null;
}

// --------------- 将数据变为响应式 ----------------
// 防止对象重复被代理
const toProxy = new WeakMap;        // {target: proxyTarget}
const toRow = new WeakMap;          // {proxyTarget: target}

function reactiveObj(target) {
    if (!isObject(target)) return target;

    // 防止同一对象被代理多次
    if (toProxy.has(target)) return toProxy.get(target);
    // 已经被代理过的对象，直接返回代理对象，防止再次重复被代理
    if (toRow.has(target)) return target;

    const proxyTarget = new Proxy(target, {
        get(target, key, receiver) {
            const dep = track(target, key);
            dep.addDepend();

            const val = Reflect.get(target, key, receiver)
            // 如果取值为对象，则需要递归将其变为响应式对象
            return isObject(val) ? reactiveObj(val) : val;
        },
        set(target, key, newVal, receive) {
            const oldVal = Reflect.get(target, key);
            const result = Reflect.set(target, key, newVal, receive);

            // 赋值，执行发布操作，执行其所有依赖函数
            const dep = track(target, key);
            dep.notify();

            return result;
        }
    });
    toProxy.set(target, proxyTarget);
    toRow.set(proxyTarget, target);

    return proxyTarget;
}

// --------------- 将函数变为响应式 -------------------

// 当前正在执行的函数，方便在其他地方取到
let activeFn = null;

/**
 *  1. 函数首先会被执行一次
 *  2. 首次执行时, 会触发响应式对象的get操作，进行依赖的收集
 *  3. 执行后需将activeFn重置
 *
 */
function effect(fn) {
    try {
        activeFn = fn;
        fn();
    } finally {
        // 确保当函数执行出错时，也会重置activeFn
        activeFn = null;
    }
}

// -------------- key -> fn 依赖收集器 --------------------
class Depend {
    constructor() {
        this.reactiveFns = new Set;
    }

    // 订阅
    addDepend() {
        // 把当前执行的函数放入依赖队列中
        activeFn && this.reactiveFns.add(activeFn);
    }

    // 发布
    notify() {
        this.reactiveFns.forEach(fn => fn());
    }
}

// -------------- 拦截 Proxy get捕获器，收集依赖操作 --------------
// 总的依赖池 其内部构造为 {obj: {key: new Depend, key2: new Depend}, obj2:{key: new Depend, key2: new Depend}}
const targetMap = new WeakMap;

function track(target, key) {
    // 没有则添加，有则返回
    let obj = targetMap.get(target);
    if (!obj) {
        obj = new Map;
        targetMap.set(target, obj);
    }

    let deps = obj.get(key);
    if (!deps) {
        deps = new Depend;
        obj.set(key, deps);
    }

    // 返回当前key对应的Depend实例
    return deps;
}

// 使用
const p1 = reactiveObj({name: 'lily', age: 18, list: [1, 2, 3, 4], nums: [{sort: 'A'}, {sort: 'B'}]});
function fn() {
    console.log('p1.name:', p1.name);
    console.log('p1.list:', p1.list);

    const sorts = p1.nums.map(item => item.sort);
    console.log('p1.sorts:', sorts);
}

effect(fn);

setTimeout(() => {
    // p1.name = 'new name';
    console.log('-------- 改变数据 --------');
    p1.nums.push({sort: 'M'})
    p1.nums[0].sort = 'C';
}, 1000 * 2)
```

#### 推荐阅读
- [监听一个变量的变化，需要怎么做 ](https://github.com/sisterAn/blog/issues/92)
- [Vue3最啰嗦的Reactivity数据响应式原理解析](https://juejin.cn/post/6965646653076439048#heading-5)
