export class Range {
  constructor(public start: number, public end: number) {}

  toOnceRepeatedNumbers(): number[] {
    return Array.from(
      { length: this.end - this.start + 1 },
      (_, i) => this.start + i
    ).filter((num) => {
      return num.isRepeatingOnce();
    });
  }

  toManyRepeatedNumbers(): number[] {
    return Array.from(
      { length: this.end - this.start + 1 },
      (_, i) => this.start + i
    ).filter((num) => {
      return num.isRepeatingMany();
    });
  }
}

declare global {
  interface String {
    toRanges(): Range[];
  }

  interface Number {
    isRepeatingOnce(): boolean;
    isRepeatingMany(): boolean;
  }
}

String.prototype.toRanges = function (): Range[] {
  return this.split(",").map((range) => {
    const [start, end] = range.split("-").map(Number);
    return new Range(Number(start), Number(end));
  });
};

Number.prototype.isRepeatingOnce = function (): boolean {
  const value = Number(this);
  if (value.toString().length % 2 !== 0) {
    return false;
  }

  const firstHalf = value.toString().slice(0, value.toString().length / 2);
  const secondHalf = value.toString().slice(value.toString().length / 2);
  return firstHalf === secondHalf;
};

Number.prototype.isRepeatingMany = function (): boolean {
  const valueAsString = this.toString();

  for (
    let stringToCheckLength = 1;
    stringToCheckLength <= valueAsString.length / 2;
    stringToCheckLength++
  ) {
    if (valueAsString.length % stringToCheckLength !== 0) continue;

    const stringToCheck = valueAsString.slice(0, stringToCheckLength);
    const repeated = stringToCheck.repeat(
      valueAsString.length / stringToCheckLength
    );
    if (repeated === valueAsString) return true;
  }

  return false;
};
