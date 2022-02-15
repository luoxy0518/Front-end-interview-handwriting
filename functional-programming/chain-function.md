## 级联/链式函数
### 概述
级联函数 也叫做 链式函数，指**在一个对象上连续调用不同方法的技巧**。

### 优点 & 缺点
- 优点
    - 减少代码量
    - 提高代码可读性
- 缺点
    - 占用了函数的返回值

### 应用场景
```js
// jQuery
$('#wrapper').fadeOut().html('Welcome, Sir').fadeIn();

// 字符串操作
'kankuuii'.replace('k', 'R').toUpperCase().substr(0, 4);
// 'RANK'

// Promise.protoype.then()
Promise.resolve().then().then().then()
```
### 实现
使用级联函数的核心，我们需要在每个函数中，返回`this`(也就是对象本身)。

```js
function Person() {
  this.name = '';
  this.age = 0;
  this.weight = 10;
}

Person.prototype = {
  setName:function(name){
    this.name = name;
    return this;
  },
  setAge:function(age){
    this.age = age;
    return this;
  },
  setWeight:function(weight) {
    this.weight = weight;
    return this;
  }
}

var uzi = new Person();

uzi.setName('Uzi').setAge(22).setWeight(160);

console.log(uzi);
// { name: "Uzi", age: 22, weight: 160 }
```
