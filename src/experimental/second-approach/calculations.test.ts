import { expect, test } from "vitest";
import { multiplyVectorMatrix } from "./calculations";
import { bignumber, BigNumber, transpose } from "mathjs";

test("Easy matrix * vector multiplication", () => {
  const vector: [BigNumber, BigNumber, BigNumber] = [
    bignumber(0),
    bignumber(2),
    bignumber(3),
  ];
  let matrix: BigNumber[][] = [
    [bignumber(-2), bignumber(0), bignumber(4)],
    [bignumber(3), bignumber(1), bignumber(-4)],
    [bignumber(0), bignumber(0), bignumber(3)],
  ];

  matrix = transpose(matrix);

  const result = multiplyVectorMatrix(vector, matrix);
  expect(result).toEqual([12, -10, 9]);
});

test("NEW APPROACH", () => {
  const vector: [BigNumber, BigNumber, BigNumber] = [
    bignumber(0.1),
    bignumber(0),
    bignumber(0),
  ];

  const matrix: BigNumber[][] = [
    [bignumber(1), bignumber(0.2), bignumber(0.3)],
    [bignumber(0.1), bignumber(1), bignumber(0.2)],
    [bignumber(0.3), bignumber(-0.1), bignumber(1)],
  ];

  const result = multiplyVectorMatrix(vector, matrix);
  expect(result).toEqual([0.1, 0.02, 0.03]);
  const result2 = multiplyVectorMatrix(result, matrix);
  expect(result2).toEqual([0.111, 0.037, 0.064]);
  const result3 = multiplyVectorMatrix(result2, matrix);
  expect(result3).toEqual([0.1339, 0.0528, 0.1047]);
});
