import { multiply, bignumber, BigNumber } from "mathjs";

/**
 * Function to multiply a vector by a 3x3 matrix using BigNumber for precision.
 *
 * This is not a standard matrix-vector multiplication, but a multiplication of the matrix columns by the vector.
 * So the matrix is transposed before the multiplication.
 *
 * @param vector The vector to multiply.
 * @param matrix The matrix to multiply by.
 */
export function multiplyVectorMatrix(
  vector: BigNumber[],
  matrix: BigNumber[][],
): BigNumber[] {
  // Validate matrix dimensions
  // if (matrix.length !== 3 || matrix.some((row) => row.length !== 3)) {
  //   throw new Error("The matrix must be 3x3.");
  // }

  // Validate vector length
  // if (vector.length !== 3) {
  //   throw new Error("The vector must have 3 components.");
  // }

  // Convert inputs to BigNumber for higher precision calculations
  const matrixBN = matrix.map((row) => row.map((num) => bignumber(num)));
  const vectorBN = vector.map((num) => bignumber(num));

  // Perform matrix-vector multiplication using mathjs
  // Instead of transposing the matrix, we multiply the vector by the transposed matrix
  // and not the other way around as it is normally done
  const resultBN = multiply(vectorBN, matrixBN) as BigNumber[];
  return resultBN;

  // Convert result back to numbers and round to avoid precision issues
  // const result = resultBN.map((num) => Number(num.toFixed(10))) as [
  //   number,
  //   number,
  //   number,
  // ];

  // return result;
}

/**
 * Function to calculate the progression of vectors over a number of rounds.
 *
 * @param initialVector The initial vector to start the progression.
 * @param matrix The matrix to use for the calculation.
 * @param rounds The number of rounds to calculate.
 * @returns An array of vectors representing the progression over the specified number of rounds.
 */
export const calculateVectorProgression = (
  initialVector: BigNumber[],
  matrix: BigNumber[][],
  rounds: number,
): BigNumber[][] => {
  const vectors = [initialVector];
  for (let i = 0; i < rounds; i++) {
    const latestVector = vectors[vectors.length - 1];
    const newVector = multiplyVectorMatrix(latestVector, matrix);
    vectors.push(newVector);
  }
  return vectors;
};
