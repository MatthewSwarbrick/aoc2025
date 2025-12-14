// const input = [
//   ".......S.......",
//   "...............",
//   ".......^.......",
//   "...............",
//   "......^.^......",
//   "...............",
//   ".....^.^.^.....",
//   "...............",
//   "....^.^...^....",
//   "...............",
//   "...^.^...^.^...",
//   "...............",
//   "..^...^.....^..",
//   "...............",
//   ".^.^.^.^.^...^.",
//   "...............",
// ];

const input = (await Bun.file("inputs/day7.txt").text()).split("\n");

const intialState = {
  beamIndices: [input[0]?.indexOf("S") ?? 0],
  numberOfBeamSplits: 0,
};

const result = input.slice(1).reduce((acc, row: string, index: number) => {
  if (!row.includes("^")) {
    return acc;
  }

  const splitters = row
    .split("")
    .map((value, index) => {
      if (value === "^" && acc.beamIndices.includes(index)) {
        return index;
      }
      return undefined;
    })
    .filter((value) => value !== undefined);

  const beamsNotBeingSplit = acc.beamIndices.filter(
    (index) => !splitters.includes(index)
  );

  const newBeamIndices = splitters.flatMap((index) => {
    return [index + 1, index - 1].filter(
      (index) => index >= 0 && index < row.length
    );
  });

  const beamIndices = Array.from(
    new Set([...beamsNotBeingSplit, ...newBeamIndices])
  );

  return {
    beamIndices,
    numberOfBeamSplits: acc.numberOfBeamSplits + splitters.length,
  };
}, intialState);

console.log(`Answer: ${result.numberOfBeamSplits}`);
