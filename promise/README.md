1. `Promise`的状态固化后，不可更改
2.
![img.png](img.png)
  
`catch`方法默认捕获当前`promise`的异常，如果当前没有异常，会捕获到下一个的异常  
```js
const p1=  new Promise((resolve, reject) => {
    reject('error')
});

p1.then(() => {
    
}).catch(() =>{
    
})
```

