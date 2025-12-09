import { getAllCombinationsOfLengthTwelve } from "./common";

const input = [
  "987654321111111",
  "811111111111119",
  "234234234234278",
  "818181911112111",
];

//const input = (await Bun.file("inputs/day3.txt").text()).split("\n");

const result = input
  .map((row: string) => {
    const rowWithoutLastDigits = row.slice(0, -11);
    const maxDigit = Math.max(...rowWithoutLastDigits.split("").map(Number));
    return rowWithoutLastDigits
      .split("")
      .map((digit, index) => (digit === maxDigit.toString() ? index : null))
      .filter((index) => index !== null)
      .map((index) => row.slice(index))
      .map((row) => getAllCombinationsOfLengthTwelve(row))
      .reduce((acc, row) => Math.max(acc, Number(row)), 0);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(`Answer: ${result}`);
