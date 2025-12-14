export class Problem {
  constructor(public numbers: number[], public operator: "+" | "*") {}

  addNumber(number: number) {
    this.numbers.push(number);
  }

  addNumbers(numbers: number[]) {
    this.numbers.push(...numbers);
  }

  evaluate() {
    return this.numbers.reduce((acc, num) => {
      if (this.operator === "+") {
        return acc + num;
      }

      if (acc === 0) {
        return num;
      }

      return acc * num;
    }, 0);
  }
}
