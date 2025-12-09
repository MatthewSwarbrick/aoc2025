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

let numberOfPaperRollsRemovedInIteration = 0;
let totalCount = 0;
let currentPaperGrid = input.toPaperGrid();
do {
  const rollsToRemove = currentPaperGrid.toAccessiblePaperRolls(4);
  numberOfPaperRollsRemovedInIteration = rollsToRemove.length;
  totalCount += numberOfPaperRollsRemovedInIteration;
  currentPaperGrid = currentPaperGrid.removeFromGrid(rollsToRemove);
} while (numberOfPaperRollsRemovedInIteration > 0);

console.log(`Answer: ${totalCount}`);
