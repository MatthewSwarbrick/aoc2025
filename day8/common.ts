type Coordinate = { x: number; y: number; z: number };
export type JunctionBox = { coordinate: Coordinate };
export type Edge = {
  junctionBoxAIndex: number;
  junctionBoxBIndex: number;
  distance: number;
};

export const calculateDistance = (a: JunctionBox, b: JunctionBox): number =>
  Math.sqrt(
    (a.coordinate.x - b.coordinate.x) ** 2 +
      (a.coordinate.y - b.coordinate.y) ** 2 +
      (a.coordinate.z - b.coordinate.z) ** 2
  );
