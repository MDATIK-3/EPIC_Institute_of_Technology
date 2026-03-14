function bind(fn, context, args) {
    return function (...rest) {
        return fn.apply(context, [...args, ...rest]);
    };
}

const foo = () => { };
const context = {};
const data = [];
const bindedFunction = bind(foo, context, data);
