function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return function (...next) {
            return curried(...args, ...next);
        };
    };
}

function sum2(x, y) {
    return x + y;
}

function sum4(a, b, c, d) {
    return a + b + c + d;
}

console.log(curry(sum2)(1)(2));
console.log(curry(sum4)(2)(3)(4)(5));