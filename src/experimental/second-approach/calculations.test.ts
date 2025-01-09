import { test } from "vitest";
import { multiplyVectorMatrix } from "./calculations";

test("NEW APPROACH", () => {
  const vector: [number, number, number] = [0.1, 0, 0];
  const matrix: number[][] = [
    [1, 0.2, 0.3],
    [0.1, 1, 0.2],
    [0.3, -0.1, 1],
  ];

  try {
    const result = multiplyVectorMatrix(vector, matrix);
    console.log("Result:", result); // Expected output: [0.1, 0.02, 0.03]
  } catch (error) {
    console.error("Error:", error);
  }
});
