import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";
import { BigNumber, bignumber } from "mathjs";

interface IMatrixEntry {
  value: BigNumber;
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
    this.calculateProductOfSums();
    this.calculateQuotient();
  }

  /**
   * Initialize the matrix with dimensions (n + 3) x (n + 3).
   * Two more in each direction for the the id and the sum of each row and column,
   * the product, and the quotient of the sums.
   */
  private initializeMatrix(): (IMatrixEntry | null)[][] {
    const size = this.variableIds.length + 3;
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
  }

  private fillInteractions(): void {
    // Set headers
    for (let i = 0; i < this.variableIds.length; i++) {
      this.matrix[0][i + 1] = { value: bignumber(this.variableIds[i]) };
      this.matrix[i + 1][0] = { value: bignumber(this.variableIds[i]) };
    }

    // Insert interaction values
    this.interactions.forEach((interaction) => {
      const rowIndex = this.variableIds.indexOf(interaction.variableId) + 1;
      const colIndex =
        this.variableIds.indexOf(interaction.impactVariableId) + 1;
      this.matrix[rowIndex][colIndex] = {
        value: bignumber(interaction.valueSelfDefined),
        source: interaction.source,
      };
    });

    // Fill the diagonal with 1s
    // (no effect on the variables themselves)
    for (let i = 1; i <= this.variableIds.length; i++) {
      this.matrix[i][i] = { value: bignumber(1) };
    }
  }

  /**
   * Calculate the absolute sum of each row and column and insert it into the matrix.
   */
  private calculateSums(): void {
    const size = this.variableIds.length + 1;
    for (let i = 1; i <= this.variableIds.length; i++) {
      const rowSum: BigNumber = this.matrix[i]
        .slice(1, size)
        .reduce(
          (sum, entry) =>
            sum.plus(bignumber(Math.abs(entry?.value.toNumber() ?? 0))),
          bignumber(0),
        );
      this.matrix[i][size] = { value: bignumber(rowSum) };
    }

    for (let j = 1; j <= this.variableIds.length; j++) {
      const colSum = this.matrix
        .slice(1, size)
        .reduce(
          (sum, row) =>
            sum.plus(bignumber(Math.abs(row[j]?.value.toNumber() ?? 0))),
          bignumber(0),
        );
      this.matrix[size][j] = { value: bignumber(colSum) };
    }
  }

  /**
   * Mulitply the active sum with the passive sum of each variable and insert it into the matrix.
   */
  private calculateProductOfSums(): void {
    for (let i = 1; i <= this.variableIds.length; i++) {
      const rowSum: BigNumber =
        this.matrix[i][this.variableIds.length + 1]!.value;
      const colSum: BigNumber =
        this.matrix[this.variableIds.length + 1][i]!.value;
      this.matrix[i][this.variableIds.length + 2] = {
        value: rowSum.times(colSum),
      };
    }
  }

  /**
   * Calculate the quotient of the active sum divided by the passive sum of each variable and insert it into the matrix.
   */
  private calculateQuotient(): void {
    for (let i = 1; i <= this.variableIds.length; i++) {
      const rowSum: BigNumber =
        this.matrix[i][this.variableIds.length + 1]!.value;
      const colSum: BigNumber =
        this.matrix[this.variableIds.length + 1][i]!.value;
      this.matrix[this.variableIds.length + 2][i] = {
        value: rowSum.dividedBy(colSum).times(100),
      };
    }
  }

  /**
   * @returns The matrix with the ids and the sums of each row and column as BigNumber.
   */
  public getBigNumberMatrixWithIdsAndSums(): (IMatrixEntry | null)[][] {
    return this.matrix;
  }

  /**
   * @returns The matrix with the ids and the sums of each row and column.
   */
  public getMatrixWithIdsAndSums() {
    return this.matrix.map((row) =>
      row.map((entry) => {
        if (entry === null) {
          return null;
        }
        return {
          value: entry.value.toNumber(),
          // conditionally add source
          ...(entry.source ? { source: entry.source } : {}),
        };
      }),
    );
  }

  /**
   * @returns The matrix values only, without the ids and sums.
   */
  public getBigNumberMatrixValuesOnly(): BigNumber[][] {
    return this.matrix
      .slice(1, this.variableIds.length + 1)
      .map((row) =>
        row
          .slice(1, this.variableIds.length + 1)
          .map((entry) => entry?.value ?? bignumber(0)),
      );
  }

  /**
   * @returns The matrix values only, without the ids and sums.
   */
  public getMatrixValuesOnly() {
    return this.matrix
      .slice(1, this.variableIds.length + 1)
      .map((row) =>
        row
          .slice(1, this.variableIds.length + 1)
          .map((entry) => entry?.value.toNumber() ?? 0),
      );
  }

  public getVariables(): ICsvVariable[] {
    return this.variables;
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
