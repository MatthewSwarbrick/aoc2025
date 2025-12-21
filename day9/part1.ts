// const input = ["7,1", "11,7", "9,7", "9,5", "2,5", "2,3", "7,3"];
const input = (await Bun.file("inputs/day9.txt").text()).split("\n");

const coordinates = input.map((line) => line.split(",").map(Number));

const maxDistanceMap = coordinates.map((coordinate) => {
  const [x, y] = coordinate;
  const otherCoordinates = coordinates.filter((c) => c !== coordinate);
  const maxDistance = otherCoordinates.reduce((max, other) => {
    const [otherX, otherY] = other;
    const area =
      (Math.abs(Number(x) - Number(otherX)) + 1) *
      (Math.abs(Number(y) - Number(otherY)) + 1);
    return Math.max(max, area);
  }, 0);
  return { coordinate, maxDistance };
});

const answer = maxDistanceMap.reduce(
  (max, { maxDistance }) => Math.max(max, maxDistance),
  0
);

console.log(`Answer: ${answer}`);
