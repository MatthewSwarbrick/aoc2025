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

const result = input
  .filter((line) => line.includes("-"))
  .map((line) => line.split("-").map(Number))
  .sort((a, b) => Number(a[0]) - Number(b[0]))
  .reduce((acc, [start, end]) => {
    if (acc.length === 0) {
      acc.push([Number(start), Number(end)]);
      return acc;
    }

    const last = acc[acc.length - 1];
    if (!last) {
      acc.push([Number(start), Number(end)]);
      return acc;
    }

    if (Number(start) <= Number(last[1]) + 1) {
      last[1] = Math.max(Number(last[1]), Number(end));
    } else {
      acc.push([Number(start), Number(end)]);
    }

    return acc;
  }, [] as number[][])
  .map(([start, end]) => Number(end) - Number(start) + 1)
  .reduce((sum, n) => sum + n, 0);

console.log(`Answer: ${result}`);
