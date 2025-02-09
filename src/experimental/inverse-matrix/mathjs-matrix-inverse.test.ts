import { bignumber, equal, inv, matrix, multiply } from "mathjs";
import { expect, test } from "vitest";

test("2x2 matrix inversion using BigNumber", () => {
  const startMatrix = matrix([
    [bignumber(2), bignumber(3)],
    [bignumber(1), bignumber(2)],
  ]);

  const expectedInvertedMatrix = matrix([
    [bignumber(2), bignumber(-3)],
    [bignumber(-1), bignumber(2)],
  ]);

  const expectedIdentityMatrix = matrix([
    [bignumber(1), bignumber(0)],
    [bignumber(0), bignumber(1)],
  ]);

  const invertedMatrix = inv(startMatrix);

  expect(invertedMatrix).toEqual(expectedInvertedMatrix);

  const identityMatrix = multiply(invertedMatrix, startMatrix);

  expect(identityMatrix).toEqual(expectedIdentityMatrix);
});

test("Another 2x2 matrix inversion using BigNumber", () => {
  const startMatrix = matrix([
    [bignumber(2), bignumber(0)],
    [bignumber(0), bignumber(2)],
  ]);

  const expectedInvertedMatrix = matrix([
    [bignumber(0.5), bignumber(0)],
    [bignumber(0), bignumber(0.5)],
  ]);

  const expectedIdentityMatrix = matrix([
    [bignumber(1), bignumber(0)],
    [bignumber(0), bignumber(1)],
  ]);

  const invertedMatrix = inv(startMatrix);

  // Compare the matrices as arrays, easy .isEqual() is not working anymore in this case
  const invertedMatrixAsArray = invertedMatrix.toArray() as number[][];
  const expectedInvertedMatrixAsArray =
    expectedInvertedMatrix.toArray() as number[][];
  const isEqual = invertedMatrixAsArray.every((row, i) => {
    return row.every((value, index) => {
      return equal(value, expectedInvertedMatrixAsArray[i][index]);
    });
  });
  expect(isEqual).toBe(true);

  const identityMatrix = multiply(invertedMatrix, startMatrix);
  expect(identityMatrix).toEqual(expectedIdentityMatrix);
});

test("3x3 matrix inversion using BigNumber", () => {
  const startMatrix = matrix([
    [bignumber(1), bignumber(0.2), bignumber(0.3)],
    [bignumber(0.1), bignumber(1), bignumber(0.2)],
    [bignumber(0.3), bignumber(-0.1), bignumber(1)],
  ]);
  const expectedIdentityMatrix = matrix([
    [bignumber(1), bignumber(0), bignumber(0)],
    [bignumber(0), bignumber(1), bignumber(0)],
    [bignumber(0), bignumber(0), bignumber(1)],
  ]);

  const invertedMatrix = inv(startMatrix);
  const identityMatrix = multiply(invertedMatrix, startMatrix);

  // Compare the matrices as arrays
  const identityMatrixAsArray = identityMatrix.toArray() as number[][];
  const expectedIdentityMatrixAsArray =
    expectedIdentityMatrix.toArray() as number[][];
  const isEqual = identityMatrixAsArray.every((row, i) => {
    return row.every((value, index) => {
      return equal(value, expectedIdentityMatrixAsArray[i][index]);
    });
  });
  expect(isEqual).toBe(true);
});
