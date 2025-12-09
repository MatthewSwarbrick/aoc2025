declare global {
  interface Array<T> {
    toPaperGrid(): PaperGrid;
  }
}

class PaperGrid extends Map<string, PaperGridLocation> {
  toAccessiblePaperRolls(maxNeighbourCount: number): Array<PaperGridLocation> {
    const values = Array.from(this.values());
    return values
      .filter((location: PaperGridLocation) => location.isPaperRoll)
      .filter((location: PaperGridLocation) => {
        return (
          this.getNeighours(location.coordinate).filter(
            (neighbour) => neighbour.isPaperRoll
          ).length < maxNeighbourCount
        );
      });
  }

  getNeighours(coordinate: Coordinate): Array<PaperGridLocation> {
    return [
      this.get(key({ x: coordinate.x - 1, y: coordinate.y })),
      this.get(key({ x: coordinate.x - 1, y: coordinate.y - 1 })),
      this.get(key({ x: coordinate.x - 1, y: coordinate.y + 1 })),
      this.get(key({ x: coordinate.x + 1, y: coordinate.y })),
      this.get(key({ x: coordinate.x + 1, y: coordinate.y - 1 })),
      this.get(key({ x: coordinate.x + 1, y: coordinate.y + 1 })),
      this.get(key({ x: coordinate.x, y: coordinate.y - 1 })),
      this.get(key({ x: coordinate.x, y: coordinate.y + 1 })),
    ].filter((location) => location !== undefined);
  }
}

type Coordinate = {
  x: number;
  y: number;
};

type PaperGridLocation = {
  coordinate: Coordinate;
  isPaperRoll: boolean;
};

Array.prototype.toPaperGrid = function (): PaperGrid {
  const paperGrid = new PaperGrid();
  for (const [y, row] of this.entries()) {
    for (const [x, column] of Array.from(row).entries()) {
      const coordinate = key({ x, y });
      if (column === "@") {
        paperGrid.set(coordinate, { coordinate: { x, y }, isPaperRoll: true });
      } else if (column === ".") {
        paperGrid.set(coordinate, { coordinate: { x, y }, isPaperRoll: false });
      }
    }
  }
  return paperGrid;
};

const key = (c: Coordinate) => `${c.x},${c.y}`;
