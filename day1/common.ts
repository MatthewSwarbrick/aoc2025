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
