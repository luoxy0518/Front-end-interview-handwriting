Array.prototype._find = function (callback, thisArgs) {
    if (!this) throw new TypeError('this is null or undefined');
    if (typeof callback !== 'function') throw new TypeError(callback + 'is not a fuunction');

    const arr = this,
        len = arr.length;

    for (let i = 0; i < len; i++) {
        if (!(i in arr)) continue;

        if (callback.call(thisArgs, arr[i], i, arr)) return arr[i];
    }
}

// 测试
const inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

console.log(inventory._find(fruit => fruit.name === 'cherries')); // { name: 'cherries', quantity: 5 }
