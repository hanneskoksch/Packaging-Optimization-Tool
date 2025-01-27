import { expect, test } from "vitest";
import { multiplyVectorMatrix } from "./calculations";
import { bignumber, BigNumber, transpose } from "mathjs";

test("Easy matrix * vector multiplication", () => {
  let matrix: BigNumber[][] = [
    [bignumber(-2), bignumber(0), bignumber(4)],
    [bignumber(3), bignumber(1), bignumber(-4)],
    [bignumber(0), bignumber(0), bignumber(3)],
  ];
  const vector: [BigNumber, BigNumber, BigNumber] = [
    bignumber(0),
    bignumber(2),
    bignumber(3),
  ];

  // Transposing the matrix so we can expect a conventional matrix vector multiplication
  matrix = transpose(matrix);

  const result = multiplyVectorMatrix(vector, matrix);
  expect(result).toEqual([bignumber(12), bignumber(-10), bignumber(9)]);
});

test("Custom matrix * vector multiplication", () => {
  const matrix: BigNumber[][] = [
    [bignumber(-2), bignumber(0), bignumber(4)],
    [bignumber(3), bignumber(1), bignumber(-4)],
    [bignumber(0), bignumber(0), bignumber(3)],
  ];
  const vector: [BigNumber, BigNumber, BigNumber] = [
    bignumber(0),
    bignumber(2),
    bignumber(3),
  ];

  const result = multiplyVectorMatrix(vector, matrix);
  expect(result).toEqual([bignumber(6), bignumber(2), bignumber(1)]);
});

test("Custom matrix * vector multiplication with decimals", () => {
  const matrix: BigNumber[][] = [
    [bignumber(1), bignumber(0.2), bignumber(0.3)],
    [bignumber(0.1), bignumber(1), bignumber(0.2)],
    [bignumber(0.3), bignumber(-0.1), bignumber(1)],
  ];

  const vector: [BigNumber, BigNumber, BigNumber] = [
    bignumber(0.1),
    bignumber(0),
    bignumber(0),
  ];

  const result = multiplyVectorMatrix(vector, matrix);
  expect(result).toEqual([bignumber(0.1), bignumber(0.02), bignumber(0.03)]);
  const result2 = multiplyVectorMatrix(result, matrix);
  expect(result2).toEqual([
    bignumber(0.111),
    bignumber(0.037),
    bignumber(0.064),
  ]);
  const result3 = multiplyVectorMatrix(result2, matrix);
  expect(result3).toEqual([
    bignumber(0.1339),
    bignumber(0.0528),
    bignumber(0.1047),
  ]);
});
