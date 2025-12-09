// const input = [
//   "3-5",
//   "10-14",
//   "16-20",
//   "12-18",
//   "",
//   "1",
//   "5",
//   "8",
//   "11",
//   "17",
//   "32",
// ];

const input = (await Bun.file("inputs/day5.txt").text()).split("\n");

const ingredientRanges = input
  .filter((line) => line.includes("-"))
  .map((range) => range.split("-").map(Number));
const ingredients = input
  .filter((line) => !line.includes("-") && line !== "")
  .map(Number);

const result = ingredients.filter((ingredient) => {
  return ingredientRanges.some(
    (range) => ingredient >= Number(range[0]) && ingredient <= Number(range[1])
  );
}).length;

console.log(`Answer: ${result}`);
