function fizzBuzz() {
  for (let number = 1; number <= 100; number += 1) {
    const result =
      "Fizz".repeat(Number(number % 3 === 0)) +
      "Buzz".repeat(Number(number % 5 === 0));

    console.log(result || number);
  }
}
fizzBuzz();