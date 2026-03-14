function sleep(seconds) {
    const end = Date.now() + seconds * 1000;
    while (Date.now() < end) { }
}

console.log(new Date());
sleep(1);
console.log(new Date());