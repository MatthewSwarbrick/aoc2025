import { calculateDistance, type Edge, type JunctionBox } from "./common";

// const input = [
//   "162,817,812",
//   "57,618,57",
//   "906,360,560",
//   "592,479,940",
//   "352,342,300",
//   "466,668,158",
//   "542,29,236",
//   "431,825,988",
//   "739,650,466",
//   "52,470,668",
//   "216,146,977",
//   "819,987,18",
//   "117,168,530",
//   "805,96,715",
//   "346,949,466",
//   "970,615,88",
//   "941,993,340",
//   "862,61,35",
//   "984,92,344",
//   "425,690,689",
// ];
const MAX_CONNECTION_COUNT = 1000;
const input = (await Bun.file("inputs/day8.txt").text()).split("\n");

const junctionBoxes: JunctionBox[] = input.map((line) => {
  const [x, y, z] = line.split(",").map(Number);
  return { coordinate: { x: Number(x), y: Number(y), z: Number(z) } };
});

const sortedDistances: Edge[] = junctionBoxes
  .flatMap((junctionBoxA, junctionBoxAIndex) =>
    junctionBoxes
      .map((junctionBoxB, junctionBoxBIndex) => ({
        junctionBoxB,
        junctionBoxBIndex,
      }))
      .filter(({ junctionBoxBIndex }) => junctionBoxBIndex > junctionBoxAIndex)
      .map(({ junctionBoxB, junctionBoxBIndex }) => ({
        junctionBoxAIndex,
        junctionBoxBIndex,
        distance: calculateDistance(junctionBoxA, junctionBoxB),
      }))
  )
  .sort((a, b) => a.distance - b.distance);

const topDistances = sortedDistances.slice(0, MAX_CONNECTION_COUNT);

const initialCircuits: Set<number>[] = junctionBoxes.map(
  (_, index) => new Set([index])
);

const finalCircuits: Set<number>[] = topDistances.reduce(
  (circuits, { junctionBoxAIndex, junctionBoxBIndex }) => {
    const setA = circuits[junctionBoxAIndex];
    const setB = circuits[junctionBoxBIndex];

    if (setA === setB) return circuits;

    const merged = new Set([...(setA ?? []), ...(setB ?? [])]);
    return circuits.map((circuit, index) =>
      merged.has(index) ? merged : circuit
    );
  },
  initialCircuits
);

const uniqueCircuitKeys = Array.from(
  new Set(finalCircuits.map((s) => [...s].sort((a, b) => a - b).join(",")))
);

const sizes = uniqueCircuitKeys
  .map((key) => key.split(",").length)
  .sort((a, b) => b - a);

const answer = sizes.slice(0, 3).reduce((acc, size) => acc * size, 1);
console.log(answer);
