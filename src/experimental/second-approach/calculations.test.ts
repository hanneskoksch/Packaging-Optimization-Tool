import { expect, test } from "vitest";
import { multiplyVectorMatrix } from "./calculations";
import { transpose } from "mathjs";

test("Easy matrix * vector multiplication", () => {
  const vector: [number, number, number] = [0, 2, 3];
  let matrix: number[][] = [
    [-2, 0, 4],
    [3, 1, -4],
    [0, 0, 3],
  ];

  matrix = transpose(matrix);

  const result = multiplyVectorMatrix(vector, matrix);
  expect(result).toEqual([12, -10, 9]);
});

test("NEW APPROACH", () => {
  const vector: [number, number, number] = [0.1, 0, 0];
  const matrix: number[][] = [
    [1, 0.2, 0.3],
    [0.1, 1, 0.2],
    [0.3, -0.1, 1],
  ];

  const result = multiplyVectorMatrix(vector, matrix);
  expect(result).toEqual([0.1, 0.02, 0.03]);
  const result2 = multiplyVectorMatrix(result, matrix);
  expect(result2).toEqual([0.111, 0.037, 0.064]);
  const result3 = multiplyVectorMatrix(result2, matrix);
  expect(result3).toEqual([0.1339, 0.0528, 0.1047]);
});
