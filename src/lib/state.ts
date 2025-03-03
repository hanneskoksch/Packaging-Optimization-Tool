import { BigNumber } from "mathjs";

export interface ExperimentalState {
  roundsToCalculate: number;
  setRoundsToCalculate: (newRoundsToCalculate: number) => void;
  matrixDataImported: boolean;
  setMatrixDataImported: (imported: boolean) => void;
  sampleMatrix: BigNumber[][];
  setSampleMatrix: (newSampleMatrix: BigNumber[][]) => void;
  initialSampleVector: BigNumber[];
  sampleVector: BigNumber[];
  setSampleVector: (newSampleVector: BigNumber[]) => void;
  variableNames: string[];
  setVariableNames: (newVariableNames: string[]) => void;
  variableIds: string[] | number[];
  setVariableIds: (newVariableIds: string[] | number[]) => void;
}
