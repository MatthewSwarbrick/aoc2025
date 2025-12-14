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

const rows = input.slice(0, input.length - 1);
const gaps = [
  0,
  ...(rows[0]
    ?.split("")
    .map((_, index) => {
      return rows.every((row) => row[index] === " ") ? index : null;
    })
    .filter((gap) => gap !== null) ?? []),
  rows[0]?.length ?? 0,
];

const problemNumbers = gaps
  .map((gap, index) => {
    if (index === gaps.length - 1) {
      return null;
    }
    return [gap, gaps[index + 1]];
  })
  .filter((gapRange) => gapRange !== null)
  .map((gapRange) => {
    return Array.from(
      { length: Number(gapRange[1]) - Number(gapRange[0]) },
      (_, index) => Number(gapRange[0]) + index
    )
      .map((index) => {
        return rows
          .map((row) => row[index])
          .join("")
          .trim();
      })
      .filter((value) => value !== "")
      .map((value) => Number(value));
  });

for (const problemNumber of problemNumbers.entries()) {
  const problemIndex = problemNumber[0];
  if (problemIndex !== undefined) {
    problems[problemIndex]?.addNumbers(problemNumber[1]);
  }
}

const result = problems
  .map((problem) => problem.evaluate())
  .reduce((acc, num) => acc + num, 0);

console.log(`Answer: ${result}`);
