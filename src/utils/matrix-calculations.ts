import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";

export function createMatrix(
  variables: ICsvVariable[],
  interactions: ICsvInteraction[],
): (number | null)[][] {
  // Extract variable IDs
  const variableIds = variables.map((variable) => variable.id);

  // Initialize the matrix with dimensions (n + 2) x (n + 2)
  // +2 for the extra row and column for the sums
  const matrix: (number | null)[][] = Array(variableIds.length + 2)
    .fill(null)
    .map(() => Array(variableIds.length + 2).fill(null));

  // Set IDs in the first row and the first column of the matrix
  matrix[0][0] = null; // Top-left corner remains null
  for (let i = 0; i < variableIds.length; i++) {
    matrix[0][i + 1] = variableIds[i]; // IDs in the first row
    matrix[i + 1][0] = variableIds[i]; // IDs in the first column
  }

  // Insert interactions into the matrix
  interactions.forEach((interaction) => {
    const rowIndex = variableIds.indexOf(interaction.variableId) + 1;
    const colIndex = variableIds.indexOf(interaction.impactVariableId) + 1;

    // Prevent overwriting the header row and column
    if (rowIndex > 0 && colIndex > 0) {
      matrix[rowIndex][colIndex] = interaction.valueSelfDefined;
    }
  });

  // Add row sums (last column) and column sums (last row)
  const matrixSize = variableIds.length + 1; // Matrix includes header row and column
  for (let i = 1; i <= variableIds.length; i++) {
    // Sum for the current row (absolute values)
    const rowSum = matrix[i]
      .slice(1, matrixSize) // Exclude header column
      .reduce<number>((sum, value) => sum + Math.abs(value ?? 0), 0); // Use absolute values
    matrix[i][matrixSize] = rowSum; // Set row sum in the last column
  }

  for (let j = 1; j <= variableIds.length; j++) {
    // Sum for the current column (absolute values)
    const colSum = matrix
      .slice(1, matrixSize) // Exclude header row
      .reduce<number>((sum, row) => sum + Math.abs(row[j] ?? 0), 0); // Use absolute values
    matrix[matrixSize][j] = colSum; // Set column sum in the last row
  }

  // Set bottom-right corner to null (sum of sums could go here if needed)
  matrix[matrixSize][matrixSize] = null;

  return matrix;
}
