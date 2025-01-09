import { multiply, bignumber, BigNumber } from "mathjs";

/**
 * Function to multiply a vector by a 3x3 matrix using BigNumber for precision
 */
export function multiplyVectorMatrix(
  vector: number[],
  matrix: number[][],
): [number, number, number] {
  // Validate matrix dimensions
  if (matrix.length !== 3 || matrix.some((row) => row.length !== 3)) {
    throw new Error("The matrix must be 3x3.");
  }

  // Validate vector length
  if (vector.length !== 3) {
    throw new Error("The vector must have 3 components.");
  }

  // Convert inputs to BigNumber for higher precision calculations
  const matrixBN = matrix.map((row) => row.map((num) => bignumber(num)));
  const vectorBN = vector.map((num) => bignumber(num));

  // Perform matrix-vector multiplication using mathjs
  const resultBN = multiply(matrixBN, vectorBN) as BigNumber[];

  // Convert result back to numbers and round to avoid precision issues
  const result = resultBN.map((num) => Number(num.toFixed(10))) as [
    number,
    number,
    number,
  ];

  return result;
}
