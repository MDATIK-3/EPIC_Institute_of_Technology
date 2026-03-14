function cal(a, b) {
    return function (sign) {
        if (sign === "+") return a + b;
        if (sign === "-") return a - b;
        if (sign === "*") return a * b;
        if (sign === "/") return b !== 0 ? a / b : Infinity;
        return NaN;
    };
}

console.log(cal(1, 2)("+"));
console.log(cal(1, 2)("/"));