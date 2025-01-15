import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";

interface IMatrixEntry {
  value: number;
  source?: string;
}

export class MatrixBuilder {
  private variables: ICsvVariable[];
  private interactions: ICsvInteraction[];
  private variableIds: number[];
  private matrix: (IMatrixEntry | null)[][];

  constructor(variables: ICsvVariable[], interactions: ICsvInteraction[]) {
    this.variables = variables;
    this.interactions = interactions;
    this.variableIds = variables.map((variable) => variable.id);
    this.matrix = this.initializeMatrix();
    this.fillInteractions();
    this.calculateSums();
  }

  /**
   * Initialize the matrix with dimensions (n + 2) x (n + 2).
   * Two more in each direction for the the id and the sum of each row and column.
   */
  private initializeMatrix(): (IMatrixEntry | null)[][] {
    const size = this.variableIds.length + 2;
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
  }

  private fillInteractions(): void {
    // Set headers
    for (let i = 0; i < this.variableIds.length; i++) {
      this.matrix[0][i + 1] = { value: this.variableIds[i] };
      this.matrix[i + 1][0] = { value: this.variableIds[i] };
    }

    // Insert interaction values
    this.interactions.forEach((interaction) => {
      const rowIndex = this.variableIds.indexOf(interaction.variableId) + 1;
      const colIndex =
        this.variableIds.indexOf(interaction.impactVariableId) + 1;
      this.matrix[rowIndex][colIndex] = {
        value: interaction.valueSelfDefined,
        source: interaction.source,
      };
    });
  }

  /**
   * Calculate the absolute sum of each row and column and insert it.
   */
  private calculateSums(): void {
    const size = this.variableIds.length + 1;
    for (let i = 1; i <= this.variableIds.length; i++) {
      const rowSum = this.matrix[i]
        .slice(1, size)
        .reduce((sum, entry) => sum + Math.abs(entry?.value ?? 0), 0);
      this.matrix[i][size] = { value: rowSum };
    }

    for (let j = 1; j <= this.variableIds.length; j++) {
      const colSum = this.matrix
        .slice(1, size)
        .reduce((sum, row) => sum + Math.abs(row[j]?.value ?? 0), 0);
      this.matrix[size][j] = { value: colSum };
    }
  }

  /**
   * @returns The matrix with the ids and the sums of each row and column.
   */
  public getMatrixWithIdsAndSums(): (IMatrixEntry | null)[][] {
    return this.matrix;
  }

  /**
   * @returns The matrix values only, without the ids and sums.
   */
  public getMatrixValuesOnly(): number[][] {
    return this.matrix
      .slice(1, this.variableIds.length + 1)
      .map((row) =>
        row
          .slice(1, this.variableIds.length + 1)
          .map((entry) => entry?.value ?? 0),
      );
  }
}

export interface IVariablesImpact {
  variable: ICsvVariable;
  activeSum: number;
  passiveSum: number;
}

export function getVariablesImpacts(
  variables: ICsvVariable[],
  interactions: ICsvInteraction[],
): IVariablesImpact[] {
  return variables.map((variable) => {
    const activeSum = interactions
      .filter((interaction) => interaction.variableId === variable.id)
      .reduce<number>(
        (sum, interaction) => sum + Math.abs(interaction.valueSelfDefined),
        0,
      );

    const passiveSum = interactions
      .filter((interaction) => interaction.impactVariableId === variable.id)
      .reduce<number>(
        (sum, interaction) => sum + Math.abs(interaction.valueSelfDefined),
        0,
      );

    return { variable, activeSum, passiveSum };
  });
}
