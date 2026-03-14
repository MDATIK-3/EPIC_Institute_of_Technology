const o = {
    counter: 0,
    set magicProperty(value) {
        this.counter = value;
        console.log(`${new Date()} --- ${value}`);
    },
    get magicProperty() {
        return ++this.counter;
    }
};

o.magicProperty = 5;
console.log(o.magicProperty);
console.log(o.magicProperty);
console.log(o.magicProperty);