import { test } from "vitest";
import { IMatrix } from "../calculations";

test("New Matrix calculations", () => {
  // A small example matrix
  const testMatrix: IMatrix = [
    [null, 2, 3],
    [0, null, 2],
    [3, -1, null],
  ];

  /**
   * Interprets a given value as a percentage adjustment with support for decimals.
   * The values are derived directly based on a formula.
   */
  function interpretValue(value: number): number {
    const baseValue = 1; // The baseline value for "0"
    const step = 0.1; // Step size for each unit (e.g., -3 maps to 0.7, +3 maps to 1.3)
    // const step = 0.01; // Step size for each unit (e.g., -3 maps to 0.97, +3 maps to 1.03)

    return baseValue + value * step;
  }

  // The variable row we want to raise
  const rowToRaise = 0;
  const impactRow = testMatrix[rowToRaise];

  // Calculate the new matrix
  const calculateNewMatrix = (matrix: IMatrix, depth: number) => {
    if (depth === 0) return matrix;

    const newMatrix = matrix.map((row, rowIndex) => {
      // No effects on itself
      if (rowIndex === rowToRaise) return row;

      const rowValue = impactRow[rowIndex];
      // Tread null as 0 that has no effect
      const rowMultiplier = interpretValue(rowValue ?? 0);

      return row.map((value) => {
        // Does not change the effect on itself
        if (value === null) return null;
        console.log(
          value,
          rowMultiplier,
          preciseMultiply(value, rowMultiplier),
        );
        return preciseMultiply(value, rowMultiplier);
      });
    });
    console.log(newMatrix);
    return calculateNewMatrix(newMatrix, depth - 1);
  };

  console.log(calculateNewMatrix(testMatrix, 1));
});

function preciseMultiply(a: number, b: number) {
  return Math.round(a * b * 100) / 100; // Runden auf zwei Dezimalstellen
}
