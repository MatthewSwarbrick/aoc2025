import { Problem } from "./common";

// const input = [
//   "123 328  51 64 ",
//   " 45 64  387 23 ",
//   "  6 98  215 314",
//   "*   +   *   +  ",
// ];

const input = (await Bun.file("inputs/day6.txt").text()).split("\n");

const problems = (input[input.length - 1]?.split(" ") ?? [])
  .map((value: string) => value.trim())
  .filter((value: string) => value !== "")
  .map((value: string) => new Problem([], value as "+" | "*"));

for (const row of input.slice(0, input.length - 1)) {
  const values = row
    .split(" ")
    .map((value: string) => value.trim())
    .filter((value: string) => value !== "");
  for (const [index, value] of values.entries()) {
    if (problems[index]) {
      problems[index].addNumber(Number(value));
    }
  }
}

const result = problems
  .map((problem) => problem.evaluate())
  .reduce((acc, num) => acc + num, 0);

console.log(`Answer: ${result}`);
