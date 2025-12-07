interface RotationInstruction {
  direction: "L" | "R";
  steps: number;
}

export const mapToRotationInstructions = (
  instructions: string[]
): RotationInstruction[] => {
  return instructions.map((instruction) => {
    return {
      direction: instruction[0] as "L" | "R",
      steps: Number.parseInt(instruction.slice(1)),
    };
  });
};

export const wrap = (position: number, maxPosition: number) => {
  return (
    ((position % (maxPosition + 1)) + (maxPosition + 1)) % (maxPosition + 1)
  );
};

export function countZeroHits(
  direction: "L" | "R",
  steps: number,
  current: number,
  maxPosition: number
): number {
  const size = maxPosition + 1;
  const step = direction === "R" ? 1 : -1;

  return Array.from({ length: steps }).reduce(
    ({ position, numberOfTimesZeroWasHit }) => {
      const newPosition = (position + step + size) % size;
      return {
        position: newPosition,
        numberOfTimesZeroWasHit:
          numberOfTimesZeroWasHit + (newPosition === 0 ? 1 : 0),
      };
    },
    { position: current, numberOfTimesZeroWasHit: 0 }
  ).numberOfTimesZeroWasHit;
}
