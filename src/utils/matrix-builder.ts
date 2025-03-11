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
  private activeSums: number[];
  private passiveSums: number[];
  private productOfSums: number[];
  private quotients: number[];

  constructor(variables: ICsvVariable[], interactions: ICsvInteraction[]) {
    this.variables = variables;
    this.interactions = interactions;
    this.variableIds = variables.map((variable) => variable.id);
    this.matrix = this.initializeMatrix();
    this.fillInteractions();
    this.activeSums = this.calculateActiveSums();
    this.passiveSums = this.calculatePassiveSums();
    this.productOfSums = this.calculateProductOfSums();
    this.quotients = this.calculateQuotient();
  }

  /**
   * Initialize the matrix with dimensions (n + 1) x (n + 1).
   * One more in each direction for the the id.
   */
  private initializeMatrix(): (IMatrixEntry | null)[][] {
    const size = this.variableIds.length + 1;
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

  private calculateActiveSums(): number[] {
    return this.variables.map((variable) =>
      this.interactions
        .filter((interaction) => interaction.variableId === variable.id)
        .reduce<number>(
          (sum, interaction) => sum + Math.abs(interaction.valueSelfDefined),
          0,
        ),
    );
  }

  public getActiveSums(): number[] {
    return this.activeSums;
  }

  private calculatePassiveSums(): number[] {
    return this.variables.map((variable) =>
      this.interactions
        .filter((interaction) => interaction.impactVariableId === variable.id)
        .reduce<number>(
          (sum, interaction) => sum + Math.abs(interaction.valueSelfDefined),
          0,
        ),
    );
  }

  public getPassiveSums(): number[] {
    return this.passiveSums;
  }

  /**
   * Mulitply the active sum with the passive sum of each variable.
   */
  private calculateProductOfSums(): number[] {
    return this.activeSums.map(
      (activeSum, index) => activeSum * this.passiveSums[index],
    );
  }

  /**
   * Calculate the quotient of the active sum divided by the passive sum of each variable.
   */
  private calculateQuotient(): number[] {
    return this.activeSums.map(
      (activeSum, index) => activeSum / this.passiveSums[index],
    );
  }

  public getProductOfSums(): number[] {
    return this.productOfSums;
  }

  public getQuotients(): number[] {
    return this.quotients;
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
      .slice(1)
      .map((row) => row.slice(1).map((entry) => entry?.value ?? bignumber(0)));
  }

  /**
   * @returns The matrix values only, without the ids and sums.
   */
  public getMatrixValuesOnly() {
    return this.matrix
      .slice(1)
      .map((row) => row.slice(1).map((entry) => entry?.value.toNumber() ?? 0));
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
