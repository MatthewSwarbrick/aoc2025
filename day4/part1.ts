import "./common";

// const input = [
//   "..@@.@@@@.",
//   "@@@.@.@.@@",
//   "@@@@@.@.@@",
//   "@.@@@@..@.",
//   "@@.@@@@.@@",
//   ".@@@@@@@.@",
//   ".@.@.@.@@@",
//   "@.@@@.@@@@",
//   ".@@@@@@@@.",
//   "@.@.@@@.@.",
// ];

const input = (await Bun.file("inputs/day4.txt").text()).split("\n");

const result = input.toPaperGrid().toAccessiblePaperRolls(4).length;

console.log(`Answer: ${result}`);
