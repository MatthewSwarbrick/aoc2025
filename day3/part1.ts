// const input = [
//   "987654321111111",
//   "811111111111119",
//   "234234234234278",
//   "818181911112111",
// ];

const input = (await Bun.file("inputs/day3.txt").text()).split("\n");

const result = input
  .map((row: string) => {
    const rowWithoutLastDigit = row.slice(0, -1);
    const maxDigit = Math.max(...rowWithoutLastDigit.split("").map(Number));
    const firstIndexOfMaxDigit = row.indexOf(maxDigit.toString());
    const rowAfterMaxDigit = row.slice(firstIndexOfMaxDigit + 1);
    const secondMaxDigit = Math.max(...rowAfterMaxDigit.split("").map(Number));
    return Number(`${maxDigit}${secondMaxDigit}`);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(`Answer: ${result}`);
