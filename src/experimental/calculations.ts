export type IMatrix = (number | null)[][];

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

function preciseMultiply(a: number, b: number) {
  return Math.round(a * b * 100) / 100; // Runden auf zwei Dezimalstellen
}

// Calculate the new matrix
export const calculateNewMatrix = (
  matrix: IMatrix,
  rowToRaiseIndex: number,
) => {
  const newMatrix = matrix.map((row, rowIndex) => {
    // No effects on itself
    if (rowIndex === rowToRaiseIndex) return row;

    const impactRow = matrix[rowToRaiseIndex];
    const rowValue = impactRow[rowIndex];
    // Tread null as 0 that has no effect
    const rowMultiplier = interpretValue(rowValue ?? 0);

    return row.map((value) => {
      // Does not change the effect on itself
      if (value === null) return null;

      return preciseMultiply(value, rowMultiplier);
    });
  });
  return newMatrix;
};
