import { countZeroHits, mapToRotationInstructions, wrap } from "./common";

// const input = [
//   "L68",
//   "L30",
//   "R48",
//   "L5",
//   "R60",
//   "L55",
//   "L1",
//   "L99",
//   "R14",
//   "L82",
// ];

const input = (await Bun.file("inputs/day1.txt").text()).split("\n");

const maxPosition = 99;
const initialStepResult = { position: 50, numberOfTimesZeroWasHit: 0 };
const result = mapToRotationInstructions(input).reduce(
  (stepResult, instruction) => {
    const { position: currentPosition, numberOfTimesZeroWasHit } = stepResult;

    const zeroHits = countZeroHits(
      instruction.direction,
      instruction.steps,
      currentPosition,
      maxPosition
    );

    const newPosition =
      instruction.direction === "L"
        ? wrap(stepResult.position - instruction.steps, maxPosition)
        : wrap(stepResult.position + instruction.steps, maxPosition);

    return {
      position: newPosition,
      numberOfTimesZeroWasHit: numberOfTimesZeroWasHit + zeroHits,
    };
  },
  initialStepResult
);

console.log(`Answer: ${result.numberOfTimesZeroWasHit}`);
