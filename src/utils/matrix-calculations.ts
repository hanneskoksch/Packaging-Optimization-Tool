import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";

export function createMatrix(
  variables: ICsvVariable[],
  interactions: ICsvInteraction[],
): (number | null)[][] {
  // Extract variable IDs
  const variableIds = variables.map((variable) => variable.id);

  // Initialize the matrix with null values
  // The matrix has (n + 1) x (n + 1) dimensions where n is the number of variables
  const matrix: (number | null)[][] = Array(variableIds.length + 1)
    .fill(null)
    .map(() => Array(variableIds.length + 1).fill(null));

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

  return matrix;
}
