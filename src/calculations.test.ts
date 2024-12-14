import { test } from "vitest";

type Matrix = (number | null)[][];

test("New Matrix calculations", () => {
  // A small example matrix
  const testMatrix: Matrix = [
    [null, 2, 3],
    [0, null, 2],
    [3, -1, null],
  ];

  // Interprets the values {-3, -2, -1, 0, 1, 2, 3} as 10% values
  const valueInterpretationsHard: Record<number, number> = {
    [-3]: 0.7,
    [-2]: 0.8,
    [-1]: 0.9,
    [0]: 1,
    [1]: 1.1,
    [2]: 1.2,
    [3]: 1.3,
  };

  // Interprets the values {-3, -2, -1, 0, 1, 2, 3} as % values
  const valueInterpretationsSoft: Record<number, number> = {
    [-3]: 0.97,
    [-2]: 0.98,
    [-1]: 0.99,
    [0]: 1,
    [1]: 1.01,
    [2]: 1.02,
    [3]: 1.03,
  };

  // The variable row we want to raise
  const rowToRaise = 0;
  const impactRow = testMatrix[rowToRaise];

  // Calculate the new matrix
  const calculateNewMatrix = (matrix: Matrix, depth: number) => {
    if (depth === 0) return matrix;

    const newMatrix = matrix.map((row, rowIndex) => {
      // No effects on itself
      if (rowIndex === rowToRaise) return row;

      const rowValue = impactRow[rowIndex];
      // Tread null as 0 that has no effect
      const rowMultiplier = valueInterpretationsHard[rowValue ?? 0];

      return row.map((value) => {
        // Does not change the effect on itself
        if (value === null) return null;

        return value * rowMultiplier;
      });
    });
    console.log(newMatrix);
    return calculateNewMatrix(newMatrix, depth - 1);
  };

  console.log(calculateNewMatrix(testMatrix, 2));
});
