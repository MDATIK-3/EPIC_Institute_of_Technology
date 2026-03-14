function getCounter(start) {
    let value = start;

    return {
        log() {
            console.log(value);
            return this;
        },
        add(num) {
            value += num;
            return this;
        },
        reset() {
            value = 0;
            return this;
        }
    };
}

const c = getCounter(5);

c
    .log()
    .add(4)
    .log()
    .add(3)
    .log()
    .reset()
    .log()
    .add(8)
    .log();