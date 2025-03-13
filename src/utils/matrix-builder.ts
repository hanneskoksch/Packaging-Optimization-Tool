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
   * Initialize the matrix with dimensions n x n.
   */
  private initializeMatrix(): (IMatrixEntry | null)[][] {
    const size = this.variableIds.length;
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
  }

  private fillInteractions(): void {
    // Insert interaction values
    this.interactions.forEach((interaction) => {
      const rowIndex = this.variableIds.indexOf(interaction.variableId);
      const colIndex = this.variableIds.indexOf(interaction.impactVariableId);
      this.matrix[rowIndex][colIndex] = {
        value: bignumber(interaction.valueSelfDefined),
        source: interaction.source,
      };
    });

    // Fill the diagonal with 1s
    // (no effect on the variables themselves)
    for (let i = 0; i < this.variableIds.length; i++) {
      this.matrix[i][i] = { value: bignumber(1) };
    }
  }

  private calculateActiveSums(): number[] {
    return this.variables.map((variable) =>
      this.interactions.reduce(
        (sum, interaction) =>
          interaction.variableId === variable.id
            ? sum + Math.abs(interaction.valueSelfDefined)
            : sum,
        0,
      ),
    );
  }

  public getActiveSums(): number[] {
    return this.activeSums;
  }

  private calculatePassiveSums(): number[] {
    return this.variables.map((variable) =>
      this.interactions.reduce(
        (sum, interaction) =>
          interaction.impactVariableId === variable.id
            ? sum + Math.abs(interaction.valueSelfDefined)
            : sum,
        0,
      ),
    );
  }

  public getPassiveSums(): number[] {
    return this.passiveSums;
  }

  public getVariableIds(): number[] {
    return this.variableIds;
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
   * Calculate the quotient of each variable.
   * Quitient: active sum divided by passive sum times 100.
   */
  private calculateQuotient(): number[] {
    return this.activeSums.map((activeSum, index) => {
      const passiveSum = this.passiveSums[index];
      return passiveSum === 0 ? 0 : (activeSum / passiveSum) * 100;
    });
  }

  public getProductOfSums(): number[] {
    return this.productOfSums;
  }

  public getQuotients(): number[] {
    return this.quotients;
  }

  /**
   * @returns The matrix optionally including the sources of the interactions.
   */
  public getMatrixWithSources() {
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
   * @returns The matrix values only.
   */
  public getMatrix(): BigNumber[][] {
    return this.matrix.map((row) =>
      row.map((entry) => entry?.value ?? bignumber(0)),
    );
  }

  public getVariables(): ICsvVariable[] {
    return this.variables;
  }

  public getVariablesImpacts(): IVariablesImpact[] {
    return this.variables.map((variable, index) => {
      const activeSum = this.activeSums[index];
      const passiveSum = this.passiveSums[index];
      return { variable, activeSum, passiveSum };
    });
  }
}

export interface IVariablesImpact {
  variable: ICsvVariable;
  activeSum: number;
  passiveSum: number;
}
